"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { useActionState, useState } from "react";
import SubmitButton from "./submitButtons";
import { createInvoice } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema } from "../utils/zodSchemas";
import { formatCurrency } from "../utils/formatCurrency";

interface iAppProps {
    firstName: string,
    lastName: string,
    address: string,
    email: string
}

export function CreateInvoice({
    address,
    email,
    firstName,
    lastName
}: iAppProps) {
    const [lastResult, action] = useActionState(createInvoice, undefined);

    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: invoiceSchema })
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput"
    })

    const [selectedDate, setSelectedDate] = useState(new Date());
    const [rate, setRate] = useState("");
    const [quantity, setQuantity] = useState("");
    const [currency, setCurrency] = useState("USD")

    const calculateTotal = (Number(quantity) || 0) * (Number(rate) || 0);


    return (
        <Card className="max-w-4xl w-full mx-auto">
            <CardContent className="p-6">
                <form
                    id={form.id}
                    action={action}
                    onSubmit={form.onSubmit}
                    noValidate
                >
                    <input type="hidden" name={fields.date.name}
                        value={selectedDate ? selectedDate.toISOString() : ""}
                    //this hidden input is for calender where we cant use defaults
                    />

                    <input type="hidden" name={fields.total.name}
                        value={calculateTotal}
                    />
                    <div className="flex flex-col gap-1 w-fit mb-6">
                        <div className="flex items-center gap-4">
                            <Badge variant="secondary">Draft</Badge>
                            <Input
                                name={fields.invoiceName.name}
                                key={fields.invoiceName.key}
                                defaultValue={fields.invoiceName.initialValue}
                                placeholder="Test 123"
                            />
                        </div>
                        <p className="text-sm text-red-500">{fields.invoiceName.errors}</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <Label>Invoice No.</Label>
                            <div className="flex ">
                                <span className="px-3 border border-r-0 rounded-l-md bg-muted flex items-center">#</span>
                                <Input
                                    className="rounded-l-none"
                                    placeholder="5"
                                    name={fields.invoiceNumber.name}
                                    key={fields.invoiceNumber.key}
                                    defaultValue={fields.invoiceNumber.initialValue}
                                />
                            </div>
                            <p className="text-sm text-red-500">{fields.invoiceNumber.errors}</p>
                        </div>
                        <div>
                            <Label>Currency</Label>
                            <Select
                                name={fields.currency.name}
                                key={fields.currency.name}
                                defaultValue="USD"
                                onValueChange={(value) => setCurrency(value)}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Currency" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="INR">Indian Rupee -- INR</SelectItem>
                                    <SelectItem value="USD">United States Dollar -- USD</SelectItem>
                                    <SelectItem value="EUR">Euro -- EUR</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-sm text-red-500">{fields.currency.errors}</p>
                        </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <Label>From</Label>
                            <div className="space-y-2">
                                <Input
                                    name={fields.fromName.name}
                                    key={fields.fromName.key}
                                    placeholder="Your Name"
                                    defaultValue={firstName + " " + lastName}
                                />
                                <p className="text-sm text-red-500">{fields.fromName.errors}</p>
                                <Input
                                    name={fields.fromEmail.name}
                                    key={fields.fromEmail.key}
                                    placeholder="Your Email"
                                    defaultValue={email}
                                />
                                <p className="text-sm text-red-500">{fields.fromEmail.errors}</p>
                                <Input
                                    name={fields.fromAddress.name}
                                    key={fields.fromAddress.key}
                                    placeholder="Your Address"
                                    defaultValue={address}
                                />
                                <p className="text-sm text-red-500">{fields.fromAddress.errors}</p>
                            </div>
                        </div>
                        <div>
                            <Label>To</Label>
                            <div className="space-y-2">
                                <Input
                                    name={fields.clientName.name}
                                    key={fields.clientName.key}
                                    defaultValue={fields.clientName.initialValue}
                                    placeholder="Client Name"
                                />
                                <p className="text-sm text-red-500">{fields.clientName.errors}</p>
                                <Input
                                    name={fields.clientEmail.name}
                                    key={fields.clientEmail.key}
                                    defaultValue={fields.clientEmail.initialValue}
                                    placeholder="Client Email"
                                />
                                <p className="text-sm text-red-500">{fields.clientEmail.errors}</p>
                                <Input
                                    name={fields.clientAddress.name}
                                    key={fields.clientAddress.key}
                                    defaultValue={fields.clientAddress.initialValue}
                                    placeholder="Client Address"
                                />
                                <p className="text-sm text-red-500">{fields.clientAddress.errors}</p>
                            </div>
                        </div>

                    </div>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                        <div>
                            <div>
                                <Label>Date</Label>
                            </div>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="outline" className="w-full text-left justify-start">
                                        <CalendarIcon />
                                        {selectedDate ? (
                                            new Intl.DateTimeFormat("en-US", {
                                                dateStyle: "long"
                                            }).format(selectedDate)
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent>
                                    <Calendar
                                        selected={selectedDate}
                                        onSelect={(date) => date && setSelectedDate(date)}
                                        mode="single"
                                        disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                                    />
                                </PopoverContent>
                            </Popover>
                            <p className="text-sm text-red-500">{fields.date.errors}</p>
                        </div>
                        <div>
                            <Label>Invoice Due</Label>
                            <Select
                                name={fields.dueDate.name}
                                key={fields.dueDate.key}
                                defaultValue={fields.dueDate.initialValue}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Select due date" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0">Due on Reciept</SelectItem>
                                    <SelectItem value="15">Net 15</SelectItem>
                                    <SelectItem value="30">Net 30</SelectItem>
                                </SelectContent>
                            </Select>
                            <p className="text-sm text-red-500">{fields.dueDate.errors}</p>
                        </div>
                    </div>
                    <div className="space-y-2">
                        {/* Header row for md and above */}
                        <div className="hidden md:grid grid-cols-12 gap-4 font-medium">
                            <Label className="col-span-6">Description</Label>
                            <Label className="col-span-2">Quantity</Label>
                            <Label className="col-span-2">Rate</Label>
                            <Label className="col-span-2">Amount</Label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                            <div className="md:col-span-6">
                                <Label className="md:hidden mb-1">Description</Label>
                                <Textarea
                                    name={fields.invoiceItemDescription.name}
                                    key={fields.invoiceItemDescription.key}
                                    defaultValue={fields.invoiceItemDescription.initialValue}
                                    placeholder="Item name & description"
                                />
                                <p className="text-sm text-red-500">{fields.invoiceItemDescription.errors}</p>
                            </div>

                            <div className="md:col-span-2">
                                <Label className="md:hidden mb-1">Quantity</Label>
                                <Input
                                    name={fields.invoiceItemQuantity.name}
                                    key={fields.invoiceItemQuantity.key}
                                    type="number"
                                    placeholder="0"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="w-full min-w-[72px] px-3"
                                />
                                <p className="text-sm text-red-500">{fields.invoiceItemQuantity.errors}</p>
                            </div>

                            <div className="md:col-span-2">
                                <Label className="md:hidden mb-1">Rate</Label>
                                <Input
                                    name={fields.invoiceItemRate.name}
                                    key={fields.invoiceItemRate.key}
                                    type="number"
                                    placeholder="0"
                                    value={rate}
                                    onChange={(e) => setRate(e.target.value)}
                                    className="w-full min-w-[72px] px-3"
                                />
                                <p className="text-sm text-red-500">{fields.invoiceItemRate.errors}</p>
                            </div>

                            <div className="md:col-span-2">
                                <Label className="md:hidden mb-1">Amount</Label>
                                <Input
                                    value={formatCurrency({
                                        amount: calculateTotal,
                                        currency: currency as any
                                    })}
                                    disabled

                                    className="w-full min-w-[72px] px-3"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end mt-4">
                        <div className="w-1/3">
                            <div className="flex justify-between py-2">
                                <span>Subtotal</span>
                                <span>{formatCurrency({
                                    amount: calculateTotal,
                                    currency: currency as any
                                })}</span>
                            </div>
                            <div className="flex justify-between py-2 border-t ">
                                <span>Total {currency}</span>
                                <span className="font-medium underline underline-offset-2">{formatCurrency({
                                    amount: calculateTotal,
                                    currency: currency as any
                                })}</span>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <Label>Note</Label>
                        <Textarea
                            name={fields.note.name}
                            key={fields.note.key}
                            defaultValue={fields.note.initialValue}
                            placeholder="Add your note right here..."
                        />
                        <p className="text-sm text-red-500">{fields.note.errors}</p>
                    </div>
                    <div className="flex justify-end items-center mt-6 ">
                        <div>
                            <SubmitButton text="Send Invoice to Client" />
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}