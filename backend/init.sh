#!/bin/bash

# Define the lock file location
LOCK_FILE="/app/seeders/.seeded.lock"

# Check if the lock file exists
if [ -f "$LOCK_FILE" ]; then
  echo "Database already seeded. Skipping seeders..."
else
  # If the lock file doesn't exist, run the seeders
  echo "Seeding the database..."
  node ./db/seeders.js

  if [ $? -eq 0 ]; then
    # Create the lock file to mark that seeding has been done
    touch "$LOCK_FILE"
    echo "Seeding complete. Lock file created."
  else
    echo "Seeding failed."
    exit 1
  fi
fi

# Start the server
node server.js
