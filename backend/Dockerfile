FROM python:3.11-slim

WORKDIR /app

COPY requirements.txt .
COPY backend/ /app/backend

RUN pip install --no-cache-dir -r requirements.txt

WORKDIR /app/backend

CMD ["uvicorn", "main:app", "--reload"]

