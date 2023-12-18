import { Link } from "react-router-dom";

export function LinkButton({to, label}: {to: string, label: string}) {
  return (
    <Link 
        to={to}
        style={{
            textDecoration: 'none',
            color: 'inherit',
        }}
    >
        {label}
    </Link>
  );
}