import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email } = req.body;

  try {
    // Just send back success for now to test the API endpoint
    res.status(200).json({ 
      status: 'success',
      message: 'Email received',
      email: email 
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ 
      status: 'error',
      message: error.message 
    });
  }
} 