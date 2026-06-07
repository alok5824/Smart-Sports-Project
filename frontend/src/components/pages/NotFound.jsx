import { Link } from "react-router-dom"

export default function NotFound() {
    return (
        <main className="main">
            <div className="page-title">
                <div className="heading" style={{ backgroundColor: "#2c7a7b" }}>
                    <div className="container">
                        <div className="row d-flex justify-content-center text-center">
                            <div className="col-lg-8">
                                <h1 className="heading-title text-white">404</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="section">
                <div className="container">
                    <div className="row justify-content-center text-center py-5">
                        <div className="col-lg-6">
                            <div style={{ fontSize: 80 }}>🏟️</div>
                            <h2 className="mt-3">Page Not Found</h2>
                            <p className="text-muted mt-2">
                                Oops! The page you're looking for doesn't exist or has been moved.
                            </p>
                            <Link to="/" className="btn btn-primary btn-submit mt-3">
                                Back to Home
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    )
}