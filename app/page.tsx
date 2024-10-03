"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [isHtml, setIsHtml] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to, subject, body, isHtml }),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success("✉️ Email sent successfully! 🎉");
      } else {
        toast.error(`🚫 Failed to send email: ${data.error}`);
      }
    } catch (error) {
      toast.error("🚫 An error occurred while sending the email");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-600">
          Fun Email Sender 🎨✉️
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="to"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              To Email 👥
            </label>
            <Input
              id="to"
              type="email"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              required
              className="w-full"
              placeholder="friend@example.com"
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Subject 📌
            </label>
            <Input
              id="subject"
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full"
              placeholder="Hey there!"
            />
          </div>
          <div>
            <label
              htmlFor="body"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Email Body 📝
            </label>
            <Textarea
              id="body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              required
              className="w-full h-32"
              placeholder="Write your message here..."
            />
          </div>
          <div className="flex items-center">
            <Checkbox
              id="isHtml"
              checked={isHtml}
              onCheckedChange={(checked) => setIsHtml(checked as boolean)}
            />
            <label htmlFor="isHtml" className="ml-2 text-sm text-gray-600">
              Send as HTML? 🖌️
            </label>
          </div>
          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
          >
            Send Email 🚀
          </Button>
        </form>
      </div>
      <ToastContainer position="bottom-right" />
    </div>
  );
}
