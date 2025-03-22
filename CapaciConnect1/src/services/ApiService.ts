import { genericRequest } from "@/utils/genericRequest";

const base_url = "https://localhost:44368/api"

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${localStorage.getItem('token')}`
}
