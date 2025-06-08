import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function CreateInvoice() {
    return (
        <Card className="max-w-4xl w-full mx-auto">
            <CardContent className="p-6">
                <div className="flex flex-col gap-1 w-fit mb-6">
                    <div className="flex items-center gap-4">
                        <Badge variant="secondary">Draft</Badge>
                        <Input placeholder="Test 123" />
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div>
                        <Label>Invoice No.</Label>
                        <div className="flex ">
                            <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">#</span>
                            <Input
                                className="rounded-l-none"
                                placeholder="5" />
                        </div>
                    </div>
                    <div>
                        <Label>Currency</Label>
                        <Select defaultValue="USD">
                            <SelectTrigger>
                                <SelectValue placeholder="Select Currency" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="INR">Indian Rupee -- INR</SelectItem>
                                <SelectItem value="USD">United States Dollar -- USD</SelectItem>
                                <SelectItem value="EUR">Euro -- EUR</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                        <Label>From</Label>
                        <div className="space-y-2">
                            <Input placeholder="Your Name"/>
                            <Input placeholder="Your Email"/>
                            <Input placeholder="Your Address"/>
                        </div>
                    </div>
                    <div>
                        <Label>To</Label>
                        <div className="space-y-2">
                            <Input placeholder="Client Name"/>
                            <Input placeholder="Client Email"/>
                            <Input placeholder="Client Address"/>
                        </div>
                    </div>

                </div>
            </CardContent>
        </Card>
    )
}