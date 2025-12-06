import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import FadeInSection from "@/components/FadeInSection";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-background px-4">
            <FadeInSection>
                <div className="text-center space-y-6 max-w-lg mx-auto">
                    <h1 className="text-9xl font-heading font-black text-primary/10 select-none">404</h1>
                    <div className="space-y-4 -mt-16 relative z-10">
                        <h2 className="text-4xl font-heading font-bold text-foreground">Page Not Found</h2>
                        <p className="text-muted-foreground text-lg">
                            Sorry, we can't find the page you're looking for. It might have been moved or deleted.
                        </p>
                        <Link to="/">
                            <Button className="btn-hero mt-4">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Return to Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </FadeInSection>
        </div>
    );
}