// test-api.js - Test script for your TCTI Auth API
const fetch = require('node-fetch'); // Install with: npm install node-fetch

// API configuration
const BASE_URL = 'http://localhost:8000';
const TEST_CREDENTIALS = {
  username: 'your_test_username',  // Replace with actual test username
  password: 'your_test_password'   // Replace with actual test password
};

async function testLogin() {
  console.log('🧪 Testing Login Endpoint...');
  
  try {
    const response = await fetch(`${BASE_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(TEST_CREDENTIALS)
    });
    
    const result = await response.json();
    console.log('✅ Login Response:', JSON.stringify(result, null, 2));
    
    if (result.success && result.token) {
      console.log('🔑 Token received:', result.token);
      return result.token;
    } else {
      console.log('❌ Login failed');
      return null;
    }
  } catch (error) {
    console.error('❌ Login error:', error.message);
    return null;
  }
}

async function testVerify(token) {
  console.log('\n🧪 Testing Verify Endpoint...');
  
  try {
    const response = await fetch(`${BASE_URL}/api/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    });
    
    const result = await response.json();
    console.log('✅ Verify Response:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('❌ Verify error:', error.message);
  }
}

async function testLogout(token) {
  console.log('\n🧪 Testing Logout Endpoint...');
  
  try {
    const response = await fetch(`${BASE_URL}/api/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    });
    
    const result = await response.json();
    console.log('✅ Logout Response:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('❌ Logout error:', error.message);
  }
}

async function testStatus() {
  console.log('\n🧪 Testing Status Endpoint...');
  
  try {
    const response = await fetch(`${BASE_URL}/api/status`);
    const result = await response.json();
    console.log('✅ Status Response:', JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error('❌ Status error:', error.message);
  }
}

async function testAll() {
  console.log('🚀 Starting API Test Suite...\n');
  
  // Test status first
  await testStatus();
  
  // Test login
  const token = await testLogin();
  
  if (token) {
    // Test verification with the obtained token
    await testVerify(token);
    
    // Test logout
    await testLogout(token);
    
    // Verify token is now invalid
    await testVerify(token);
  }
  
  console.log('\n✅ Test Suite Complete!');
}

// Run tests
testAll().catch(console.error);