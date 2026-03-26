import { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
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
  const { theme } = useTheme();
  const { showToast } = useToast();
  const isDark = theme === "dark";

  const [reviews, setReviews] = useState<WebsiteReview[]>([]);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const sectionBg = isDark ? "" : "bg-gray-50/80";
  const cardBg = isDark
    ? "bg-white/[0.03] border-white/10"
    : "bg-white border-gray-200 shadow-sm";
  const titleCls = isDark ? "text-white" : "text-gray-900";
  const subCls = isDark ? "text-gray-400" : "text-gray-500";
  const formBg = isDark
    ? "bg-white/[0.03] border-white/10"
    : "bg-white border-gray-200 shadow-sm";
  const textareaCls = isDark
    ? "bg-[#1a1a1f] border-white/10 text-white placeholder-gray-600"
    : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400";
  const nameCls = isDark ? "text-gray-200" : "text-gray-800";
  const commentCls = isDark ? "text-gray-400" : "text-gray-600";
  const dateCls = isDark ? "text-gray-600" : "text-gray-400";

  const loadReviews = async () => {
    try {
      setLoadingReviews(true);
      const data = await getLatestWebsiteReviews(6);
      setReviews(data);
    } catch (err) {
      console.error("Hiba az értékelések betöltésekor:", err);
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
    <section className={`px-4 sm:px-8 py-16 ${sectionBg}`}>
      <div className="max-w-6xl mx-auto">

        {/* Fejléc!! */}
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-extrabold mb-3 ${titleCls}`}>
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

        {/* Értékelés kártyák  */}
        {!loadingReviews && reviews.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            {reviews.map((review) => (
              <div
                key={review.id}
                className={`rounded-2xl border p-6 flex flex-col gap-3 hover:-translate-y-1 transition-all duration-200 ${cardBg}`}
              >
                <Quote size={20} className="text-indigo-400 opacity-60" />
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
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#667eea] to-[#764ba2] text-white font-semibold text-sm hover:-translate-y-0.5 hover:shadow-lg hover:shadow-indigo-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
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
            <a href="/login" className="text-indigo-400 hover:text-indigo-300 font-semibold underline underline-offset-2">
              jelentkezzen be
            </a>
            .
          </p>
        )}

        {/* Sikeres beküldés utáni üzenet */}
        {submitted && (
          <p className={`text-center text-sm mt-4 font-medium text-green-400`}>
            ✓ Köszönjük értékelését!
          </p>
        )}
      </div>
    </section>
  );
};

export default WebsiteReviewSection;