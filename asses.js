const express = require('express');
const app = express();

app.use(express.json());


let bookings = [
    { id: 1, name: "A", email: "Aexample.com", event: "Node.js Workshop" },
    { id: 2, name: "B",email: "B@examcom", event: "React Bootcamp" }
];


app.get('/api/bookings', (req, res) => {
    res.json(bookings);
});


app.post('/api/bookings', (req, res) => {
    const { name, email, event } = req.body;

    if (!name || !email || !event) {
        return res.status(400).json({ message: "Name, email, and event are required" });
    }

    const newBooking = {
        id: bookings.length ? bookings[bookings.length - 1].id + 1 : 1,
        name,
        email,
        event
    };

    bookings.push(newBooking);
    res.status(201).json({ message: "Booking created successfully", booking: newBooking });
});


app.get('/api/bookings/:id', (req, res) => {
    const booking = bookings.find(b => b.id == req.params.id);

    if (!booking) {
        return res.status(404).json({ message: "Booking not found" });
    }

    res.json(booking);
});


app.put('/api/bookings/:id', (req, res) => {
    const index = bookings.findIndex(b => b.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Booking not found" });
    }

    const { name, email, event } = req.body;
    bookings[index] = {
        ...bookings[index],
        name: name || bookings[index].name,
        email: email || bookings[index].email,
        event: event || bookings[index].event
    };

    res.json({ message: "Booking updated successfully", booking: bookings[index] });
});


app.delete('/api/bookings/:id', (req, res) => {
    const index = bookings.findIndex(b => b.id == req.params.id);

    if (index === -1) {
        return res.status(404).json({ message: "Booking not found" });
    }

    const deleted = bookings.splice(index, 1);
    res.json({ message: "Booking cancelled successfully", deletedBooking: deleted[0] });
});


app.listen(8000, () => {
    console.log("🎉 Synergia Event Booking API running on port 8000");
});