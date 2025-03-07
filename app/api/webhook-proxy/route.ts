import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    // Get the request body
    const body = await request.json();
    
    console.log('Webhook proxy received data:', body);
    
    // Forward the request to webhook.site
    const response = await fetch('https://webhook.site/bacb301f-32e3-487b-acd6-f804c349fb28', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
    
    // Get the response
    const responseData = await response.text();
    console.log('Webhook response:', response.status, responseData);
    
    // Return the response
    return NextResponse.json({ 
      success: response.ok,
      status: response.status,
      data: responseData || 'No response data',
      message: response.ok ? 'Webhook request successful' : 'Webhook request failed'
    });
  } catch (error) {
    console.error('Webhook proxy error:', error);
    
    // Return error response
    return NextResponse.json({ 
      success: false, 
      message: 'Error processing webhook request',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
} 