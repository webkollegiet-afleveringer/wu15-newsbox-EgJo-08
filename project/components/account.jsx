import { Link } from "react-router-dom"

export function Account() {
    return (
        <>
            <article id="account">
                <div className="account_header">
                    <img src="images/newsify_logo.png" alt="newsify_logo" />
                    <h2>Newsify</h2>
                    <p>Welcome! Let’s dive into your account!</p>
                </div>
                <div className="account_main">
                    <Link to="/home">
                        <button>Continue with Facebook</button>
                    </Link>

                    <Link to="/home">
                        <button>Continue with Google</button>
                    </Link>
                </div>
                <div className="divider">
                    <span>or</span>
                </div>
                <div className="account_footer">
                    <Link to="/home">
                    <button>Sign in with password </button>
                    </Link>

                    <p>Don't have an account?<Link to="/home">Sign up</Link></p>
                </div>
            </article>
        </>
    )
}