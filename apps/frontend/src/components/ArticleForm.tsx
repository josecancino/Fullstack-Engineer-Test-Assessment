import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { ArticleInput, ALLOWED_IMAGE_HOSTS } from '@/lib/data';

type ArticleFormProps = {
  initialData?: ArticleInput;
  onSubmit: (data: ArticleInput) => Promise<void>;
  submitLabel: string;
};

type FormErrors = Partial<Record<'title' | 'content' | 'imageUrl', string>>;

const canParseUrl = (value: string): boolean => {
  if (typeof URL.canParse === 'function') {
    return URL.canParse(value);
  }
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  if (error && typeof error === 'object' && 'message' in error) {
    return String((error as Record<'message', unknown>).message);
  }
  return 'An unexpected error occurred while saving the article.';
};

const validateForm = (title: string, content: string, imageUrl: string): FormErrors => {
  const newErrors: FormErrors = {};

  if (!title.trim()) newErrors.title = 'Title is required';
  if (!content.trim()) newErrors.content = 'Content is required';

  const trimmedUrl = imageUrl.trim();
  if (trimmedUrl) {
    if (!canParseUrl(trimmedUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    } else {
      const url = new URL(trimmedUrl);
      if (url.protocol !== 'https:') {
        newErrors.imageUrl = 'Only secure URLs (https) are allowed';
      } else if (!ALLOWED_IMAGE_HOSTS.includes(url.hostname)) {
        newErrors.imageUrl = `Only images from ${ALLOWED_IMAGE_HOSTS.join(', ')} are supported`;
      }
    }
  }

  return newErrors;
};

export default function ArticleForm({ initialData, onSubmit, submitLabel }: ArticleFormProps) {
  const router = useRouter();

  const [errors, setErrors] = useState<FormErrors>({});
  const [serverError, setServerError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isSubmitting) return;

    setServerError('');

    const formData = new FormData(e.currentTarget);

    const title = String(formData.get('title') ?? '');
    const content = String(formData.get('content') ?? '');
    const imageUrl = String(formData.get('imageUrl') ?? '');

    const newErrors = validateForm(title, content, imageUrl);
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const finalImageUrl = imageUrl.trim();

      await onSubmit({
        title: title.trim(),
        content: content.trim(),
        imageUrl: finalImageUrl || null,
      });
    } catch (error: unknown) {
      setServerError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="space-y-8 bg-white p-6 md:p-10 rounded-3xl border border-gray-100 shadow-2xl shadow-gray-200/40"
    >
      {serverError && (
        <div className="bg-red-50 border border-red-100 text-red-600 px-6 py-4 rounded-2xl text-sm font-bold flex items-center gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 flex-shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {serverError}
        </div>
      )}

      <div className="space-y-8">
        <div>
          <label
            htmlFor="title"
            className="block text-[11px] font-black text-gray-400 mb-3 uppercase tracking-[0.2em] px-1"
          >
            Article Title
          </label>
          <input
            type="text"
            name="title"
            id="title"
            data-testid="article-title-input"
            defaultValue={initialData?.title}
            disabled={isSubmitting}
            className={`w-full px-6 py-4 bg-white border-2 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all font-bold text-lg placeholder:text-gray-300 ${errors.title ? 'border-red-200 bg-red-50/30' : 'border-gray-100 hover:border-gray-200'
              }`}
            placeholder="The evolution of the #10 role..."
          />
          {errors.title && (
            <p className="text-red-500 text-[10px] font-black mt-2 uppercase tracking-widest px-1">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="imageUrl"
            className="block text-[11px] font-black text-gray-400 mb-3 uppercase tracking-[0.2em] px-1"
          >
            Image URL (Optional)
          </label>
          <input
            type="url"
            name="imageUrl"
            id="imageUrl"
            data-testid="article-image-url-input"
            defaultValue={initialData?.imageUrl ?? ''}
            disabled={isSubmitting}
            className={`w-full px-6 py-4 bg-white border-2 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all font-medium placeholder:text-gray-300 ${errors.imageUrl
                ? 'border-red-200 bg-red-50/30'
                : 'border-gray-100 hover:border-gray-200'
              }`}
            placeholder="https://images.unsplash.com/..."
          />
          {errors.imageUrl && (
            <p className="text-red-500 text-[10px] font-black mt-2 uppercase tracking-widest px-1">
              {errors.imageUrl}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-[11px] font-black text-gray-400 mb-3 uppercase tracking-[0.2em] px-1"
          >
            Content
          </label>
          <textarea
            name="content"
            id="content"
            data-testid="article-content-input"
            rows={10}
            defaultValue={initialData?.content}
            disabled={isSubmitting}
            className={`w-full px-6 py-4 bg-white border-2 rounded-2xl focus:ring-4 focus:ring-blue-100 focus:border-blue-600 outline-none transition-all resize-none font-medium leading-relaxed placeholder:text-gray-300 ${errors.content
                ? 'border-red-200 bg-red-50/30'
                : 'border-gray-100 hover:border-gray-200'
              }`}
            placeholder="Deep dive into the tactical setup and player performance..."
          />
          {errors.content && (
            <p className="text-red-500 text-[10px] font-black mt-2 uppercase tracking-widest px-1">
              {errors.content}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-col-reverse md:flex-row justify-end items-center gap-6 pt-8 mt-4 border-t border-gray-50">
        <button
          type="button"
          onClick={() => router.back()}
          disabled={isSubmitting}
          className="w-full md:w-auto bg-red-600 text-white font-black py-4 px-12 rounded-2xl transition-all hover:bg-red-500 active:scale-[0.98] shadow-lg shadow-red-200/50 uppercase text-xs tracking-widest"
        >
          Cancel
        </button>

        <button
          type="submit"
          data-testid="submit-article-button"
          disabled={isSubmitting}
          className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white font-black py-4 px-12 rounded-2xl transition-all disabled:opacity-50 shadow-lg shadow-blue-200/50 flex items-center justify-center gap-3 uppercase text-xs tracking-widest"
        >
          {isSubmitting ? (
            <>
              <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
              <span>Processing...</span>
            </>
          ) : (
            <span>{submitLabel}</span>
          )}
        </button>
      </div>
    </form>
  );
}
