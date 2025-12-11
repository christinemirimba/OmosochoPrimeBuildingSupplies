import { Helmet } from 'react-helmet-async';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Bell, Moon, Sun, Monitor } from 'lucide-react';
import FadeInSection from '@/components/FadeInSection';
import { useTheme } from '@/components/ThemeProvider';
import ExitButton from '@/components/ExitButton';

/**
 * ThemeSelector Component
 * Allows users to switch between light, dark, and system theme preferences
 */
const ThemeSelector = () => {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex items-center justify-between">
            <div className="space-y-0.5">
                <Label>Theme Preference</Label>
                <p className="text-sm text-muted-foreground">
                    Select your preferred display theme
                </p>
            </div>
            <div className="flex items-center gap-1 border rounded-lg p-1">
                <Button
                    variant={theme === 'light' ? 'default' : 'ghost'}
                    size="sm"
                    className="h-8"
                    onClick={() => setTheme('light')}
                >
                    <Sun className="w-4 h-4 mr-2" /> Light
                </Button>
                <Button
                    variant={theme === 'dark' ? 'default' : 'ghost'}
                    size="sm"
                    className="h-8"
                    onClick={() => setTheme('dark')}
                >
                    <Moon className="w-4 h-4 mr-2" /> Dark
                </Button>
                <Button
                    variant={theme === 'system' ? 'default' : 'ghost'}
                    size="sm"
                    className="h-8"
                    onClick={() => setTheme('system')}
                >
                    <Monitor className="w-4 h-4 mr-2" /> System
                </Button>
            </div>
        </div>
    );
};

/**
 * Settings Page
 * Allows users to configure app preferences including theme and notifications
 */
const Settings = () => {
    return (
        <>
            <Helmet>
                <title>Settings | Omosocho Prime</title>
            </Helmet>

            <div className="min-h-screen py-12 relative">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Exit Button - Close type for Settings page */}
                    <div className="absolute top-4 right-4 z-10">
                        <ExitButton type="close" className="relative" />
                    </div>
                    <FadeInSection>
                        <h1 className="text-3xl font-heading font-bold mb-8">Settings</h1>
                    </FadeInSection>

                    <div className="grid gap-8">
                        {/* Appearance Section */}
                        <FadeInSection delay={100}>
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <Sun className="w-5 h-5 text-primary" />
                                        <CardTitle>Appearance</CardTitle>
                                    </div>
                                    <CardDescription>Customize how Omosocho Prime looks on your device.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <ThemeSelector />
                                </CardContent>
                            </Card>
                        </FadeInSection>

                        {/* Notifications Section */}
                        <FadeInSection delay={200}>
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center gap-2">
                                        <Bell className="w-5 h-5 text-primary" />
                                        <CardTitle>Notifications</CardTitle>
                                    </div>
                                    <CardDescription>Manage your email notification preferences.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Order Updates</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive emails about your order status
                                            </p>
                                        </div>
                                        <Switch defaultChecked />
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="space-y-0.5">
                                            <Label>Promotional Emails</Label>
                                            <p className="text-sm text-muted-foreground">
                                                Receive emails about new products and sales
                                            </p>
                                        </div>
                                        <Switch />
                                    </div>
                                </CardContent>
                            </Card>
                        </FadeInSection>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Settings;
