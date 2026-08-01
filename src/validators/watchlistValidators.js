import z from "zod";

const watchlistItemSchema = z.object({
  movieId: z.string().uuid(),
  status: z.enum(["PLANNED", "WATCHING", "COMPLETED"]).optional(),
  rating: z.coerce
    .number()
    .int()
    .min(1, "Rating must be a positive integer")
    .max(10, "Rating must be a positive integer")
    .optional(),
  note: z.string().max(500, "Note must be at most 500 characters").optional(),
});


export { watchlistItemSchema };