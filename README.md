# FishRestaurant

This project now includes basic Firebase Firestore integration.

## Setup

1. Copy `.env.example` to `.env.local` and fill in your Firebase project values.
2. Install dependencies (`npm install`).
3. Run the development server with `npm run dev`.

Reservations are submitted to Firestore under:
`sections/{sectionId}/tables/{tableId}/slots/{slotId}` following the schema provided.
