import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Check, ChevronRight, Download, Home, Ruler, Package, ClipboardList } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateSimplePDF } from '@/utils/simplePDF';
import FadeInSection from '@/components/FadeInSection';

const steps = [
    { id: 1, title: 'Project Type', icon: Home },
    { id: 2, title: 'Dimensions', icon: Ruler },
    { id: 3, title: 'Materials', icon: Package },
    { id: 4, title: 'Summary', icon: ClipboardList },
];

const Plan = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
    const [formData, setFormData] = useState({
        projectName: '',
        projectType: '',
        buildingType: '',
        length: '',
        width: '',
        height: '',
        floors: '1',
        roofingMaterial: '',
        wallMaterial: '',
        flooringMaterial: '',
        additionalNotes: '',
    });
    const { toast } = useToast();

    const updateFormData = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const nextStep = () => {
        if (currentStep < 4) setCurrentStep(currentStep + 1);
    };

    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleDownloadText = () => {
        toast({
            title: 'Report Ready (TXT)',
            description: 'Your editable TXT report has been prepared for download.',
        });

        const report = `OMOSOCHO PRIME - CONSTRUCTION PLAN REPORT\n==========================================\n\nProject: ${formData.projectName || 'Untitled Project'}\nType: ${formData.projectType} - ${formData.buildingType}\n\nDIMENSIONS:\n- Length: ${formData.length}m\n- Width: ${formData.width}m\n- Height: ${formData.height}m\n- Floors: ${formData.floors}\n\nMATERIALS:\n- Roofing: ${formData.roofingMaterial}\n- Walls: ${formData.wallMaterial}\n- Flooring: ${formData.flooringMaterial}\n\nADDITIONAL NOTES:\n${formData.additionalNotes || 'None'}\n\n==========================================\nGenerated on: ${new Date().toLocaleDateString()}\nContact: Omosocho Prime Building Supplies\nLocation: Kisii, Nyamache - Kenya\nPhone: +254705621054\n`;

        const blob = new Blob([report], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${formData.projectName || 'construction-plan'}-report.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    const handleDownloadPDF = async () => {
        setIsGeneratingPDF(true);
        try {
            toast({
                title: 'Generating PDF',
                description: 'Preparing your project summary PDF.',
            });

            const blob = await generateSimplePDF(formData);

            // Create download link and trigger download
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            const filename = `${(formData.projectName || 'construction-plan').replace(/[^a-z0-9\-]/gi, '_')}_report.pdf`;
            a.download = filename;

            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            toast({
                title: 'PDF Ready',
                description: 'Your project summary has been downloaded as PDF.',
            });
        } catch (error) {
            console.error('PDF generation error:', error);
            toast({
                title: 'Download Failed',
                description: 'Failed to generate PDF. Using text fallback.',
            });
        } finally {
            setIsGeneratingPDF(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>Construction Plan Manager | Omosocho Prime</title>
                <meta name="description" content="Plan your construction project with Omosocho Prime's interactive planning tool. Get material estimates and project summaries." />
            </Helmet>

            <div className="min-h-screen py-12">
                <div className="container mx-auto px-4">
                    <FadeInSection>
                        <div className="text-center mb-12">
                            <h1 className="text-4xl font-heading font-bold mb-4">Construction Plan Manager</h1>
                            <p className="text-muted-foreground max-w-2xl mx-auto">
                                Plan your construction project step by step. Get material recommendations and generate a project summary.
                            </p>
                        </div>
                    </FadeInSection>

                    {/* Stepper */}
                    <div className="max-w-4xl mx-auto mb-12">
                        <div className="flex items-center justify-between">
                            {steps.map((step, index) => (
                                <div key={step.id} className="flex items-center">
                                    <div
                                        className={`flex flex-col items-center ${step.id <= currentStep ? 'text-primary' : 'text-muted-foreground'
                                            }`}
                                    >
                                        <div
                                            className={`w-12 h-12 rounded-full flex items-center justify-center border-2 mb-2 transition-colors ${step.id < currentStep
                                                    ? 'bg-primary border-primary text-primary-foreground'
                                                    : step.id === currentStep
                                                        ? 'border-primary bg-primary/10'
                                                        : 'border-muted-foreground/30'
                                                }`}
                                        >
                                            {step.id < currentStep ? (
                                                <Check className="w-5 h-5" />
                                            ) : (
                                                <step.icon className="w-5 h-5" />
                                            )}
                                        </div>
                                        <span className="text-sm font-medium hidden sm:block">{step.title}</span>
                                    </div>
                                    {index < steps.length - 1 && (
                                        <div
                                            className={`h-0.5 w-12 sm:w-24 mx-2 ${step.id < currentStep ? 'bg-primary' : 'bg-muted'
                                                }`}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Step Content */}
                    <Card className="max-w-2xl mx-auto">
                        <CardHeader>
                            <CardTitle>{steps[currentStep - 1].title}</CardTitle>
                            <CardDescription>
                                Step {currentStep} of {steps.length}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            {currentStep === 1 && (
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="projectName">Project Name</Label>
                                        <Input
                                            id="projectName"
                                            placeholder="My Dream Home"
                                            value={formData.projectName}
                                            onChange={(e) => updateFormData('projectName', e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="projectType">Project Type</Label>
                                        <Select value={formData.projectType} onValueChange={(v) => updateFormData('projectType', v)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select project type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="residential">Residential</SelectItem>
                                                <SelectItem value="commercial">Commercial</SelectItem>
                                                <SelectItem value="industrial">Industrial</SelectItem>
                                                <SelectItem value="renovation">Renovation</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="buildingType">Building Type</Label>
                                        <Select value={formData.buildingType} onValueChange={(v) => updateFormData('buildingType', v)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select building type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="house">House</SelectItem>
                                                <SelectItem value="apartment">Apartment Block</SelectItem>
                                                <SelectItem value="office">Office Building</SelectItem>
                                                <SelectItem value="warehouse">Warehouse</SelectItem>
                                                <SelectItem value="retail">Retail Store</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>
                            )}

                            {currentStep === 2 && (
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="length">Length (meters)</Label>
                                            <Input
                                                id="length"
                                                type="number"
                                                placeholder="20"
                                                value={formData.length}
                                                onChange={(e) => updateFormData('length', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="width">Width (meters)</Label>
                                            <Input
                                                id="width"
                                                type="number"
                                                placeholder="15"
                                                value={formData.width}
                                                onChange={(e) => updateFormData('width', e.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="height">Height (meters)</Label>
                                            <Input
                                                id="height"
                                                type="number"
                                                placeholder="3"
                                                value={formData.height}
                                                onChange={(e) => updateFormData('height', e.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="floors">Number of Floors</Label>
                                            <Select value={formData.floors} onValueChange={(v) => updateFormData('floors', v)}>
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                                                        <SelectItem key={n} value={n.toString()}>
                                                            {n} {n === 1 ? 'Floor' : 'Floors'}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {currentStep === 3 && (
                                <div className="space-y-4">
                                    <div>
                                        <Label htmlFor="roofingMaterial">Roofing Material</Label>
                                        <Select value={formData.roofingMaterial} onValueChange={(v) => updateFormData('roofingMaterial', v)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select roofing" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="mabati">Mabati (Iron Sheets)</SelectItem>
                                                <SelectItem value="tiles">Roofing Tiles</SelectItem>
                                                <SelectItem value="concrete">Concrete Slab</SelectItem>
                                                <SelectItem value="shingles">Asphalt Shingles</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="wallMaterial">Wall Material</Label>
                                        <Select value={formData.wallMaterial} onValueChange={(v) => updateFormData('wallMaterial', v)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select wall material" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="blocks">Concrete Blocks</SelectItem>
                                                <SelectItem value="bricks">Bricks</SelectItem>
                                                <SelectItem value="stone">Natural Stone</SelectItem>
                                                <SelectItem value="timber">Timber Frame</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="flooringMaterial">Flooring Material</Label>
                                        <Select value={formData.flooringMaterial} onValueChange={(v) => updateFormData('flooringMaterial', v)}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select flooring" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="tiles">Ceramic Tiles</SelectItem>
                                                <SelectItem value="concrete">Polished Concrete</SelectItem>
                                                <SelectItem value="terrazzo">Terrazzo</SelectItem>
                                                <SelectItem value="wood">Wood/Laminate</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div>
                                        <Label htmlFor="additionalNotes">Additional Notes</Label>
                                        <Textarea
                                            id="additionalNotes"
                                            placeholder="Any special requirements or notes..."
                                            value={formData.additionalNotes}
                                            onChange={(e) => updateFormData('additionalNotes', e.target.value)}
                                        />
                                    </div>
                                </div>
                            )}

                            {currentStep === 4 && (
                                <div className="space-y-6">
                                    <div className="bg-secondary rounded-lg p-6 space-y-4">
                                        <h3 className="font-semibold text-lg">Project Summary</h3>
                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <span className="text-muted-foreground">Project Name:</span>
                                                <p className="font-medium">{formData.projectName || 'Not specified'}</p>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Type:</span>
                                                <p className="font-medium capitalize">{formData.projectType} - {formData.buildingType}</p>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Dimensions:</span>
                                                <p className="font-medium">{formData.length}m × {formData.width}m × {formData.height}m</p>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Floors:</span>
                                                <p className="font-medium">{formData.floors}</p>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Roofing:</span>
                                                <p className="font-medium capitalize">{formData.roofingMaterial || 'Not specified'}</p>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Walls:</span>
                                                <p className="font-medium capitalize">{formData.wallMaterial || 'Not specified'}</p>
                                            </div>
                                            <div>
                                                <span className="text-muted-foreground">Flooring:</span>
                                                <p className="font-medium capitalize">{formData.flooringMaterial || 'Not specified'}</p>
                                            </div>
                                        </div>
                                        {formData.additionalNotes && (
                                            <div>
                                                <span className="text-muted-foreground text-sm">Notes:</span>
                                                <p className="text-sm">{formData.additionalNotes}</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <Button onClick={handleDownloadPDF} className="w-full" size="lg" variant="accent" disabled={isGeneratingPDF} aria-label="Download PDF">
                                            <Download className="w-4 h-4 mr-2" />
                                            {isGeneratingPDF ? 'Generating...' : 'DOWNLOAD PDF'}
                                        </Button>
                                        <Button onClick={handleDownloadText} className="w-full" size="lg" variant="outline">
                                            <ClipboardList className="w-4 h-4 mr-2" />
                                            Download TXT (Editable)
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Navigation */}
                            <div className="flex justify-between pt-4">
                                <Button
                                    variant="outline"
                                    onClick={prevStep}
                                    disabled={currentStep === 1}
                                >
                                    Previous
                                </Button>
                                {currentStep < 4 && (
                                    <Button onClick={nextStep}>
                                        Next
                                        <ChevronRight className="w-4 h-4 ml-1" />
                                    </Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </>
    );
};

export default Plan;