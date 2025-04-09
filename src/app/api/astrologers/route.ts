import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

// Helper function to handle CORS
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*", // This can remain as wildcard since we're not using credentials here
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
}

// Handle OPTIONS request for CORS preflight
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders() });
}

export async function GET() {
  // Try to get URI from environment variable first, then fall back to hardcoded URI
  const uri = process.env.MONGO_URI || "mongodb+srv://2005akjha:aditya@cluster0.gxoqohx.mongodb.net/astroalert";
  
  if (!uri) {
    console.error("MongoDB URI is not configured");
    return NextResponse.json(
      { error: "MongoDB URI is not configured" },
      { status: 500, headers: corsHeaders() }
    );
  }

  // Mask the URI for logging
  const maskedUri = uri.replace(
    /mongodb(\+srv)?:\/\/([^:]+):([^@]+)@/,
    'mongodb$1://$2:****@'
  );
  console.log("MongoDB URI (masked for security):", maskedUri);
  console.log("Using environment variable:", !!process.env.MONGO_URI);
  
  const client = new MongoClient(uri);

  try {
    console.log("Attempting to connect to MongoDB...");
    await client.connect();
    console.log("Successfully connected to MongoDB");
    
    const db = client.db("astroalert");
    console.log("Accessing database:", db.databaseName);
    
    // First try the astrologers collection
    let collection = db.collection("astrologers");
    console.log("Accessing collection:", collection.collectionName);
    
    console.log("Executing find query on astrologers collection...");
    let astrologers = await collection.find({}).toArray();
    console.log(`Query successful. Found ${astrologers.length} astrologers in 'astrologers' collection`);
    
    // If no data found, try the astrologerprofiles collection
    if (astrologers.length === 0) {
      collection = db.collection("astrologerprofiles");
      console.log("No data found in 'astrologers' collection. Trying 'astrologerprofiles' collection...");
      astrologers = await collection.find({}).toArray();
      console.log(`Query successful. Found ${astrologers.length} astrologers in 'astrologerprofiles' collection`);
    }
    
    // If still no data, return an empty array with a message
    if (astrologers.length === 0) {
      console.log("No astrologers data found in any collection");
      return NextResponse.json(
        { 
          astrologers: [],
          message: "No astrologers data found in the database"
        }, 
        { headers: corsHeaders() }
      );
    }
    
    return NextResponse.json(astrologers, { headers: corsHeaders() });
  } catch (error) {
    console.error("MongoDB Error Details:", error);
    
    // Create a safe error object that can be serialized to JSON
    const safeError = {
      message: error instanceof Error ? error.message : String(error),
      name: error instanceof Error ? error.name : "Unknown Error",
      stack: error instanceof Error ? error.stack : undefined
    };
    
    return NextResponse.json(
      { 
        error: "Failed to fetch astrologers", 
        details: safeError
      },
      { status: 500, headers: corsHeaders() }
    );
  } finally {
    try {
      await client.close();
      console.log("MongoDB connection closed");
    } catch (closeError) {
      console.error("Error closing MongoDB connection:", closeError);
    }
  }
}