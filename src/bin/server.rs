use std::{env, net::SocketAddr, path::PathBuf};

use axum::{
    extract::State,
    http::StatusCode,
    response::{IntoResponse, Response},
    routing::{get, post},
    Json, Router,
};
use serde::{Deserialize, Serialize};
use tower_http::services::ServeDir;

#[derive(Clone)]
struct AppState {
    build_path: PathBuf,
}

#[derive(Serialize)]
struct ApiStatus {
    message: &'static str,
}

#[derive(Debug, Deserialize)]
struct ChatRequest {
    message: String,
}

#[derive(Serialize)]
struct ChatResponse {
    reply: String,
}

#[derive(Serialize)]
struct ErrorResponse {
    error: &'static str,
}

#[tokio::main]
async fn main() {
    init_tracing();

    let port = env::var("PORT")
        .ok()
        .and_then(|value| value.parse::<u16>().ok())
        .unwrap_or(3000);

    let build_path = env::current_dir()
        .unwrap_or_else(|_| PathBuf::from("."))
        .join("build");

    let state = AppState {
        build_path: build_path.clone(),
    };

    let app = Router::new()
        .route("/api", get(api_status))
        .route("/api/chat", post(chat))
        .fallback(get(spa_fallback))
        .nest_service("/", ServeDir::new(build_path))
        .with_state(state);

    let address = SocketAddr::from(([0, 0, 0, 0], port));
    tracing::info!("Server läuft auf http://{address}");

    let listener = tokio::net::TcpListener::bind(address)
        .await
        .expect("TCP listener could not bind to address");

    axum::serve(listener, app)
        .await
        .expect("Server failed unexpectedly");
}

async fn api_status() -> Json<ApiStatus> {
    Json(ApiStatus {
        message: "Welcome to Smartchatai API",
    })
}

async fn chat(
    Json(payload): Json<ChatRequest>,
) -> Result<Json<ChatResponse>, (StatusCode, Json<ErrorResponse>)> {
    let trimmed_message = payload.message.trim();

    if trimmed_message.is_empty() {
        return Err((
            StatusCode::BAD_REQUEST,
            Json(ErrorResponse {
                error: "A valid message is required.",
            }),
        ));
    }

    Ok(Json(ChatResponse {
        reply: format!("Bot-Antwort: {trimmed_message}"),
    }))
}

async fn spa_fallback(State(state): State<AppState>) -> Response {
    let index_path = state.build_path.join("index.html");

    match tokio::fs::read_to_string(index_path).await {
        Ok(contents) => (StatusCode::OK, contents).into_response(),
        Err(_) => (
            StatusCode::NOT_FOUND,
            "Frontend build fehlt. Bitte zuerst `npm run build` ausführen.",
        )
            .into_response(),
    }
}

fn init_tracing() {
    tracing_subscriber::fmt()
        .with_env_filter(
            tracing_subscriber::EnvFilter::try_from_default_env()
                .unwrap_or_else(|_| "smartchatai_server=info,tower_http=info".into()),
        )
        .with_target(false)
        .compact()
        .init();
}
