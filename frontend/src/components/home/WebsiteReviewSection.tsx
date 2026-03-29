import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useToast } from "../../context/ToastContext";
import {
  createWebsiteReview,
  getLatestWebsiteReviews,
  type WebsiteReview,
} from "../../services/websiteReview.service";

const AVATAR_BASE = import.meta.env.VITE_API_URL ?? "http://localhost:3001";

const StarRating = ({
  value,
  onChange,
  readonly = false,
}: {
  value: number;
  onChange?: (v: number) => void;
  readonly?: boolean;
}) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((star) => (
      <Star
        key={star}
        size={readonly ? 14 : 22}
        onClick={() => !readonly && onChange?.(star)}
        className={`transition-colors ${
          star <= value ? "text-yellow-400 fill-yellow-400" : "text-gray-600"
        } ${!readonly ? "cursor-pointer hover:text-yellow-300 hover:fill-yellow-300" : ""}`}
      />
    ))}
  </div>
);

const WebsiteReviewSection = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [reviews, setReviews] = useState<WebsiteReview[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [reviewError, setReviewError] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const sectionBg = "";
  const cardBg = "bg-white/[0.025] border-white/6 hover:bg-white/[0.045] hover:border-white/12";
  const titleCls = "text-white";
  const subCls = "text-gray-500";
  const formBg = "bg-white/[0.02] border-white/8";
  const textareaCls = "bg-white/[0.03] border-white/10 text-white placeholder-gray-600";
  const nameCls = "text-gray-200";
  const commentCls = "text-gray-400";
  const dateCls = "text-gray-600";

  const loadReviews = async () => {
    try {
      setLoadingReviews(true);
      setReviewError(false);
      const data = await getLatestWebsiteReviews(6);
      setReviews(data);
    } catch {
      setReviewError(true);
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!rating) return;
    try {
      setSubmitting(true);
      await createWebsiteReview({ rating, comment: comment.trim() || undefined });
      setSubmitted(true);
      setComment("");
      setRating(5);
      showToast("Köszönjük az értékelését!", "success");
      await loadReviews();
    } catch {
      showToast("Hiba az értékelés beküldésekor.", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const avgRating =
    reviews.length > 0
      ? reviews.reduce((s, r) => s + r.rating, 0) / reviews.length
      : 0;

  return (
    <section id="reviews" className={`px-4 sm:px-8 py-24 ${sectionBg}`}>
      <div className="max-w-6xl mx-auto">

        {/* Fejléc */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-bold tracking-widest uppercase text-violet-500 mb-4">
            Vélemények
          </span>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 ${titleCls}`}>
            Mit mondanak rólunk?
          </h2>
          <p className={`text-base mb-4 ${subCls}`}>
            Valódi visszajelzések valódi felhasználóktól.
          </p>
          {reviews.length > 0 && (
            <div className="flex items-center justify-center gap-2">
              <StarRating value={Math.round(avgRating)} readonly />
              <span className={`text-sm font-semibold ${subCls}`}>
                {avgRating.toFixed(1)} / 5 ({reviews.length} értékelés)
              </span>
            </div>
          )}
        </div>

        {/* Loading skeletons */}
        {loadingReviews && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl border border-white/6 bg-white/[0.02] p-6 flex flex-col gap-3 animate-pulse">
                <div className="w-5 h-5 rounded-full bg-white/8" />
                <div className="space-y-2 flex-1">
                  <div className="h-3 bg-white/8 rounded w-full" />
                  <div className="h-3 bg-white/8 rounded w-4/5" />
                  <div className="h-3 bg-white/8 rounded w-3/5" />
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="w-8 h-8 rounded-full bg-white/8" />
                  <div className="space-y-1">
                    <div className="h-3 bg-white/8 rounded w-20" />
                    <div className="h-2 bg-white/8 rounded w-14" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!loadingReviews && reviewError && (
          <div className="text-center py-12 mb-12">
            <div className="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
              <Star size={20} className="text-red-500/60" />
            </div>
            <p className="text-gray-600 text-sm">Nem sikerült betölteni az értékeléseket.</p>
          </div>
        )}

        {/* Empty state */}
        {!loadingReviews && !reviewError && reviews.length === 0 && (
          <div className="text-center py-12 mb-12">
            <div className="w-12 h-12 rounded-full bg-white/5 border border-white/8 flex items-center justify-center mx-auto mb-4">
              <Star size={20} className="text-gray-600" />
            </div>
            <p className="text-gray-600 text-sm">Még nincsenek értékelések. Legyen Ön az első!</p>
          </div>
        )}

        {/* Értékelés kártyák */}
        {!loadingReviews && !reviewError && reviews.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {reviews.map((review) => (
              <div
                key={review.id}
                className={`rounded-2xl border p-6 flex flex-col gap-3 hover:-translate-y-1 transition-all duration-200 ${cardBg}`}
              >
                <Quote size={20} className="text-violet-500 opacity-80" />
                {review.comment && (
                  <p className={`text-sm leading-relaxed flex-1 ${commentCls}`}>
                    "{review.comment}"
                  </p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <div className="flex items-center gap-2">
                    {review.user.avatar ? (
                      <img
                        src={`${AVATAR_BASE}${review.user.avatar}`}
                        alt={review.user.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-white text-xs font-bold">
                        {review.user.name[0].toUpperCase()}
                      </div>
                    )}
                    <div>
                      <p className={`text-sm font-semibold leading-tight ${nameCls}`}>
                        {review.user.name}
                      </p>
                      <p className={`text-xs ${dateCls}`}>
                        {new Date(review.createdAt).toLocaleDateString("hu-HU")}
                      </p>
                    </div>
                  </div>
                  <StarRating value={review.rating} readonly />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Értékelés írás form – csak bejelentkezett felhasználóknak + lásd: service-ben limitálva van 6db-ra... */}
        {user && !submitted && (
          <div className={`max-w-xl mx-auto rounded-2xl border p-6 sm:p-8 ${formBg}`}>
            <h3 className={`text-lg font-bold mb-1 ${titleCls}`}>
              Ossza meg véleményét!
            </h3>
            <p className={`text-sm mb-6 ${subCls}`}>
              Tapasztalata segít másoknak megismerni a Chronos platformot.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <p className={`text-sm font-semibold mb-2 ${subCls}`}>Értékelés</p>
                <StarRating value={rating} onChange={setRating} />
              </div>
              <div>
                <p className={`text-sm font-semibold mb-2 ${subCls}`}>
                  Megjegyzés <span className="font-normal opacity-60">(nem kötelező)</span>
                </p>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Írja le tapasztalatait a platformmal kapcsolatban..."
                  rows={3}
                  className={`w-full px-4 py-3 rounded-xl border text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all ${textareaCls}`}
                />
              </div>
              <button
                type="submit"
                disabled={submitting || rating === 0}
                className="w-full py-3 rounded-xl border border-white/15 bg-white/8 hover:bg-white/12 text-white font-semibold text-sm transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
              >
                {submitting ? "Beküldés..." : "Értékelés beküldése"}
              </button>
            </form>
          </div>
        )}

        {/* Bejelentkezésre buzdítás (cta) */}
        {!user && (
          <p className={`text-center text-sm mt-4 ${subCls}`}>
            Az értékelés beküldéséhez{" "}
            <a href="/login" className="text-violet-400 hover:text-violet-300 font-semibold underline underline-offset-2">
              jelentkezzen be
            </a>
            .
          </p>
        )}

        {/* Sikeres beküldés utáni üzenet */}
        {submitted && (
          <p className="text-center text-sm mt-4 font-medium text-green-400">
            Köszönjük értékelését!
          </p>
        )}
      </div>
    </section>
  );
};

export default WebsiteReviewSection;