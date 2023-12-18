import { Rating } from '@mui/material';
interface IRatingStars {
      popularity?: number;
   }

export function RatingStars({popularity}: IRatingStars) {
 return(
    <Rating name="read-only" value={popularity ? (popularity*5/100):0} precision={0.5} readOnly />
 );
}
