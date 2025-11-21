import { FormEvent, ChangeEvent, useState } from 'react';
import { successToast, errorToast } from 'utils/toast';

type FormValues = {
  fullName: string;
  subject: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.fullName.trim()) {
    errors.fullName = 'Full name is required.';
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required.';
  } else {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(values.email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }
  }

  if (!values.subject.trim()) {
    errors.subject = 'Subject is required.';
  }

  if (!values.message.trim()) {
    errors.message = 'Message is required.';
  }

  return errors;
}

export default function ContactPage() {
  const [values, setValues] = useState<FormValues>({
    fullName: '',
    subject: '',
    email: '',
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      errorToast('Please fix the highlighted errors.');
      return;
    }

    successToast('Message sent successfully!');
    setValues({
      fullName: '',
      subject: '',
      email: '',
      message: '',
    });
    setErrors({});
  }

  return (
    <section className="max-w-3xl py-8 mx-auto md:px-4">
      <h1 className="mb-6 text-4xl font-semibold">Contact us</h1>
      <p className="mb-8 text-sm">
        Have a question about an order, products or anything else? Send us a
        message and we&apos;ll get back to you as soon as we can.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-6">
        <div>
          <label htmlFor="fullName" className="block mb-1 text-sm font-medium">
            Full name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            value={values.fullName}
            onChange={handleChange}
            className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 ${
              errors.fullName
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:ring-gray-200'
            }`}
            placeholder="Jane Doe"
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-red-600">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 ${
              errors.email
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:ring-gray-200'
            }`}
            placeholder="you@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="subject" className="block mb-1 text-sm font-medium">
            Subject
          </label>
          <input
            id="subject"
            name="subject"
            type="text"
            value={values.subject}
            onChange={handleChange}
            className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 ${
              errors.subject
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:ring-gray-200'
            }`}
            placeholder="Question subject"
          />
          {errors.subject && (
            <p className="mt-1 text-xs text-red-600">{errors.subject}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block mb-1 text-sm font-medium">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={values.message}
            onChange={handleChange}
            className={`w-full rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 resize-none ${
              errors.message
                ? 'border-red-500 focus:ring-red-200'
                : 'border-gray-300 focus:ring-gray-200'
            }`}
            placeholder="Write your message here..."
          />
          {errors.message && (
            <p className="mt-1 text-xs text-red-600">{errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="inline-flex items-center justify-center px-6 py-2 text-sm font-semibold text-white bg-black rounded-md hover:bg-gray-900"
        >
          Send message
        </button>
      </form>
    </section>
  );
}
