import pytest
from fastapi.testclient import TestClient
from server import app

client = TestClient(app)

def test_root_endpoint():
    response = client.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "Hello World"}

def test_cors_headers():
    response = client.get("/")
    assert response.headers["access-control-allow-origin"] == "*"
    assert "access-control-allow-credentials" in response.headers
    assert "access-control-allow-methods" in response.headers
    assert "access-control-allow-headers" in response.headers