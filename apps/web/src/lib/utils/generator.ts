import { customAlphabet } from "nanoid";

/**
 * Generates a slug of a specified size using a custom alphabet.
 *
 * @param {number} [size=21] - The length of the slug to generate. Defaults to 21 if not provided.
 * @returns {string} A randomly generated slug consisting of numbers and lowercase letters.
 */
export function generateSlug(size: number = 21) {
  return customAlphabet("1234567890abcdefghijklmnopqrstuvwxyz", size)();
}
