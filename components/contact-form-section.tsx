"use client";
import React, { useState } from "react";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";
import { FaArrowRight } from "react-icons/fa";
import { IoIosSend } from "react-icons/io";
import { cn } from "@/lib/utils";

const ContactFormSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSuccess(true);
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSuccess(false);
      }
    } catch (error) {
      setSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex">
      <div className="flex-1"></div>
      <div className="flex-1">
        <h2 className="text-black text-5xl font-bold mb-2">Contact Us</h2>

        {success !== null && (
          <div
            className={cn(success ? "text-green-500" : "text-red-500", "mb-2")}
          >
            {success ? "Message sent successfully!" : "Something went wrong."}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="text-black">
              Name
            </label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="border p-2 w-full mb-4 text-black placeholder:text-neutral-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-black">
              Email
            </label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="border p-2 w-full mb-4 text-black placeholder:text-neutral-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-black">
              Message
            </label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="border p-2 w-full text-black placeholder:text-neutral-500 h-32"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`mt-4 px-8 py-4 rounded-full ${
              isSubmitting ? "bg-gray-600" : "bg-black"
            }`}
          >
            {isSubmitting ? (
              "Sending..."
            ) : (
              <span className="flex items-center gap-4">
                Send Message
                <IoIosSend />
              </span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactFormSection;
