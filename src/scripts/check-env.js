const required_vars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID',
  ];

  const missing = required_vars.filter((
    required_var) => process.env[required_var] === '' || 
    process.env[required_var] === undefined
  );

  if (missing.length > 0) {
    console.error('Missing env vars:\n' + missing.join('\n'));
    process.exit(1);
  }