# locustfile.py
from locust import HttpUser, task, between
import random

class WebsiteUser(HttpUser):
    host = "http://127.0.0.1:5000"
    wait_time = between(1, 3)
    created_user_ids = []  # List to store IDs of users created for deletion testing

    @task(3)
    def get_all_users(self):
        self.client.get("/users")

    @task(1)
    def get_single_user(self):
        self.client.get("/users/1")  

    @task(2)
    def create_user(self):
        response = self.client.post("/users", json={
            "name": "New User",
            "email": "newuser@example.com"
        })
        # Add new user ID to list for potential deletion
        if response.status_code == 201:
            self.created_user_ids.append(response.json().get("id"))

    @task(2)
    def update_user(self):
        self.client.put("/users/1", json={
            "name": "Updated User",
            "email": "updateduser@example.com"
        })

    @task(1)
    def delete_user(self):
        # Only delete if there are IDs available
        if self.created_user_ids:
            user_id = random.choice(self.created_user_ids)
            response = self.client.delete(f"/users/{user_id}")
            if response.status_code == 200:
                self.created_user_ids.remove(user_id)