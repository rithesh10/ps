FROM python:3.10-slim
WORKDIR /app

# Install system dependencies if required by pandas/scikit
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3-dev \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# The model files should be copied
COPY . .

EXPOSE 5000
CMD ["python", "server.py"]
