import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";

const Payment = () => {
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);
  const [formData, setFormData] = useState({
    amount: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    studentName: "",
    studentId: "",
    course: "",
    semester: "",
    department: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Get user details from localStorage
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setUserDetails(userData);
      // Pre-fill student details if available
      setFormData((prev) => ({
        ...prev,
        studentName: userData.username || "",
        studentId: userData.collegeId || "",
      }));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    setTimeout(() => {
      const currentDate = new Date();
      const transactionId = `MRU${currentDate.getTime()}`;

      // Create PDF document
      const doc = new jsPDF();

      // Add university logo/header
      doc.setFontSize(20);
      doc.text("MALLA REDDY UNIVERSITY", 105, 20, { align: "center" });
      doc.setFontSize(16);
      doc.text("Payment Slip", 105, 30, { align: "center" });

      // Add separator line
      doc.setLineWidth(0.5);
      doc.line(20, 35, 190, 35);

      // Student Details
      doc.setFontSize(12);
      doc.text("Student Details:", 20, 45);
      doc.setFontSize(10);
      doc.text(`Name: ${formData.studentName}`, 20, 55);
      doc.text(`Student ID: ${formData.studentId}`, 20, 65);
      doc.text(`Course: ${formData.course}`, 20, 75);
      doc.text(`Semester: ${formData.semester}`, 20, 85);
      doc.text(`Department: ${formData.department}`, 20, 95);

      // Transaction Details
      doc.setFontSize(12);
      doc.text("Transaction Details:", 20, 110);
      doc.setFontSize(10);
      doc.text(`Transaction ID: ${transactionId}`, 20, 120);
      doc.text(`Date: ${currentDate.toLocaleDateString()}`, 20, 130);
      doc.text(`Time: ${currentDate.toLocaleTimeString()}`, 20, 140);

      // Payment Information
      doc.setFontSize(12);
      doc.text("Payment Information:", 20, 155);
      doc.setFontSize(10);
      doc.text(`Amount: ₹${formData.amount}`, 20, 165);
      doc.text(
        `Payment Method: Card ending in ${formData.cardNumber.slice(-4)}`,
        20,
        175
      );
      doc.text("Card Type: Credit/Debit Card", 20, 185);

      // University Details
      doc.setFontSize(12);
      doc.text("University Details:", 20, 200);
      doc.setFontSize(10);
      doc.text("Institution: Malla Reddy University", 20, 210);
      doc.text("Address: Maisammaguda, Dhulapally, Secunderabad", 20, 220);
      doc.text("Telangana - 500100", 20, 230);
      doc.text("Phone: +91-XXXXXXXXXX", 20, 240);
      doc.text("Email: info@mallareddyuniversity.ac.in", 20, 250);

      // Payment Status
      doc.setFontSize(12);
      doc.text("Payment Status: SUCCESSFUL", 105, 265, { align: "center" });

      // Footer
      doc.setFontSize(10);
      doc.text("This is an electronically generated payment slip.", 105, 275, {
        align: "center",
      });
      doc.text("Please keep this for your records.", 105, 285, {
        align: "center",
      });
      doc.text("Thank you for your payment!", 105, 295, { align: "center" });

      // Add bottom border
      doc.line(20, 300, 190, 300);

      // Save the PDF
      doc.save(`MRU_Payment_Slip_${transactionId}.pdf`);

      alert("Payment successful! Payment slip downloaded.");
      navigate("/dashboard");
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-3xl font-bold text-center mb-8">
            Malla Reddy University
          </h2>
          <h3 className="text-xl text-center text-gray-600 mb-8">
            Payment Details
          </h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Student Details Section */}
            <div className="border-b pb-4">
              <h4 className="text-lg font-semibold mb-4">
                Student Information
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Student Name
                  </label>
                  <input
                    type="text"
                    name="studentName"
                    value={formData.studentName}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Student ID
                  </label>
                  <input
                    type="text"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Course
                  </label>
                  <input
                    type="text"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Semester
                  </label>
                  <input
                    type="text"
                    name="semester"
                    value={formData.semester}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Department
                  </label>
                  <input
                    type="text"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Payment Details Section */}
            <div className="border-b pb-4">
              <h4 className="text-lg font-semibold mb-4">
                Payment Information
              </h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                    required
                    placeholder="1234 5678 9012 3456"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleChange}
                      required
                      placeholder="MM/YY"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleChange}
                      required
                      placeholder="123"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 rounded-md text-white font-semibold ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              } transition-colors duration-300`}
            >
              {loading ? "Processing..." : "Pay Now"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Payment;
