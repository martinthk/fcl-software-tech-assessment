// components/Form.tsx
"use client";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface FormData {
  model: string;
  date: Date | null;
  licenseLevel: string;
  quantity: string;
  comment: string;
}

const Form: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    model: "default",
    date: null,
    licenseLevel: "default",
    quantity: "",
    comment: "",
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/submitForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Form Submitted:", data.batch);
        // Reset the form or navigate to a success page
      } else {
        console.error("Error submitting form:", response.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
    console.log("Form Submitted:", formData);
  };

  return (
    <div className="border-solid border-2 rounded border-copper p-10">
      <form className="mx-auto" onSubmit={handleFormSubmit}>
        {/* Title */}
        <h1 className="text-xl font-medium mb-8">Batch Form</h1>
        {/* Model */}
        <div className="mb-4">
          <select
            className="border rounded text-black w-96 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) =>
              setFormData({ ...formData, model: e.target.value })
            }
            value={formData.model}
            required
          >
            <option value="default" disabled hidden>
              Model
            </option>
            <option value="Model 1">Model 1</option>
            <option value="Model 2">Model 2</option>
            <option value="Model 3">Model 3</option>
          </select>
        </div>

        {/* Date picker */}
        <div className="mb-4">
          <DatePicker
            selected={formData.date}
            onChange={(date) => setFormData({ ...formData, date: date })}
            dateFormat="dd/MM/yyyy"
            className="border rounded text-black w-full min-h-[39.5px] py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            wrapperClassName="w-full"
            placeholderText="dd/mm/yyyy"
          />
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <input
            type="number"
            className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
            onChange={(e) =>
              setFormData({ ...formData, quantity: e.target.value })
            }
            value={formData.quantity}
            required
            placeholder="Quantity"
          />
        </div>

        {/* License Level */}
        <div className="mb-4">
          <select
            className="border rounded text-black w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
            onChange={(e) =>
              setFormData({ ...formData, licenseLevel: e.target.value })
            }
            value={formData.licenseLevel}
            required
          >
            <option value="default" disabled hidden>
              License Level
            </option>
            {[...Array(10)].map((_, index) => (
              <option key={index} value={index}>
                {index}
              </option>
            ))}
          </select>
        </div>

        {/* Comments */}
        <input
          type="text"
          className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline text-black"
          placeholder="Comment (Not required)"
          onChange={(e) =>
            setFormData({ ...formData, comment: e.target.value })
          }
          value={formData.comment}
        />
        {/* Submit button */}
        <div className="mt-10">
          <button
            type="submit"
            className="bg-copper hover:bg-copper text-white py-2 px-4 rounded w-full  focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
