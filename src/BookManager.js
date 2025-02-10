import { useState } from "react";
import { Button } from "./components/ui/button";
import { Card, CardContent } from "./components/ui/card";
import { Input } from "./components/ui/input";
import emailjs from "@emailjs/browser";

export default function BookManager() {
  const [books, setBooks] = useState([]);
  const [newBook, setNewBook] = useState("");
  const [order, setOrder] = useState({ name: "", address: "", phone: "", book: "" });
  const [isOrdering, setIsOrdering] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const adminPassword = "admin123"; // Change this to a secure password

  const handleLogin = () => {
    if (password === adminPassword) {
      setIsAdmin(true);
    } else {
      alert("סיסמה שגויה");
    }
    setPassword("");
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const sendNotification = (order) => {
    const serviceId = "service_xuowj3d";
    const templateId = "template_9nku25l";
    const publicKey = "Yazn4T5g8r3d3BwZj";

    const templateParams = {
      book: order.book,
      name: order.name,
      address: order.address,
      phone: order.phone,
    };

    emailjs.send(serviceId, templateId, templateParams, publicKey)
      .then((response) => {
        console.log("Email sent successfully!", response.status, response.text);
      })
      .catch((error) => {
        console.error("Failed to send email:", error);
      });
  };

  const addBook = () => {
    if (newBook.trim()) {
      setBooks([...books, { title: newBook, image: "" }]);
      setNewBook("");
    }
  };

  const removeBook = (book) => {
    setBooks(books.filter((b) => b.title !== book.title));
  };

  const openOrderForm = (book) => {
    setOrder({ ...order, book: book.title });
    setIsOrdering(true);
  };

  const submitOrder = () => {
    alert(`הזמנה נשלחה עבור: ${order.book}, ${order.name}, ${order.address}, ${order.phone}`);
    sendNotification(order);
    setIsOrdering(false);
  };

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">רשימת ספרים</h1>
      {!isAdmin ? (
        <div className="flex space-x-2">
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="הכנס סיסמת מנהל" />
          <Button onClick={handleLogin}>כניסת מנהל</Button>
        </div>
      ) : (
        <Button onClick={handleLogout} variant="secondary">התנתק</Button>
      )}
      {isAdmin && (
        <div className="flex space-x-2">
          <Input value={newBook} onChange={(e) => setNewBook(e.target.value)} placeholder="שם הספר" />
          <Button onClick={addBook}>הוסף</Button>
        </div>
      )}
      <div className="grid gap-2">
        {books.map((book, index) => (
          <Card key={index} className="p-2 flex justify-between items-center">
            <img src={book.image || "https://via.placeholder.com/100"} alt={book.title} className="w-16 h-16 rounded" />
            <CardContent>{book.title}</CardContent>
            <div className="space-x-2">
              <Button onClick={() => openOrderForm(book)}>הזמן</Button>
              {isAdmin && <Button variant="destructive" onClick={() => removeBook(book)}>מחק</Button>}
            </div>
          </Card>
        ))}
      </div>
      {isOrdering && (
        <div className="p-4 border rounded shadow-md">
          <h2 className="font-bold">הזמנת ספר: {order.book}</h2>
          <Input value={order.name} onChange={(e) => setOrder({ ...order, name: e.target.value })} placeholder="שם מלא" />
          <Input value={order.address} onChange={(e) => setOrder({ ...order, address: e.target.value })} placeholder="כתובת למשלוח" />
          <Input value={order.phone} onChange={(e) => setOrder({ ...order, phone: e.target.value })} placeholder="טלפון" />
          <Button className="mt-2" onClick={submitOrder}>שלח הזמנה</Button>
        </div>
      )}
    </div>
  );
}
