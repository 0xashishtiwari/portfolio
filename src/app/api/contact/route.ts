import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return Response.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    await resend.emails.send({
      from: 'Contact <portfolio-contact@mail.securewhisper.ashishx.in>', 
      // must be a verified domain email
      to: 'ashishinrewa@gmail.com',
      subject: `New message from ${name}`,
      replyTo: email,
      html: `
        <h2>You have a new message from your portfolio contact form!</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    return Response.json({
      message: 'Message received!',
      success: true,
    })

  } catch (error) {
    console.error('Resend error:', error)
    return Response.json(
      { error: 'Something went wrong' },
      { status: 500 }
    )
  }
}