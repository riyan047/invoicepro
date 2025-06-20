"use client"
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { useActionState, useState } from "react";
import SubmitButton from "./submitButtons";
import { editInvoiceAction } from "../actions";
import { useForm } from "@conform-to/react";
import { parseWithZod } from "@conform-to/zod";
import { invoiceSchema } from "../utils/zodSchemas";
import { formatCurrency } from "../utils/formatCurrency";
import { Prisma } from "@prisma/client";

interface iAppProps {
    data: Prisma.InvoiceGetPayload<{}>
}

export function EditInvoice({ data }: iAppProps) {

    const [lastResult, action] = useActionState(editInvoiceAction, undefined);

    const [form, fields] = useForm({
        lastResult,
        onValidate({ formData }) {
            return parseWithZod(formData, { schema: invoiceSchema })
        },
        shouldValidate: "onBlur",
        shouldRevalidate: "onInput"
    })

    const [selectedDate, setSelectedDate] = useState(data.date);
    const [rate, setRate] = useState(data.invoiceItemRate.toString());
    const [quantity, setQuantity] = useState(data.invoiceItemQuantity.toString());
    const [currency, setCurrency] = useState(data.currency)

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
                        value={selectedDate.toISOString()}
                    //this hidden input is for calender where we cant use defaults
                    />
                    <input type="hidden" name="id"
                        value={data.id}
                    //hidden input to pass in id for server action(form.id)
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
                                defaultValue={data.invoiceName}
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
                                    defaultValue={data.invoiceNumber}
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
                                    defaultValue={data.fromName}
                                />
                                <p className="text-sm text-red-500">{fields.fromName.errors}</p>
                                <Input
                                    name={fields.fromEmail.name}
                                    key={fields.fromEmail.key}
                                    placeholder="Your Email"
                                    defaultValue={data.fromEmail}
                                />
                                <p className="text-sm text-red-500">{fields.fromEmail.errors}</p>
                                <Input
                                    name={fields.fromAddress.name}
                                    key={fields.fromAddress.key}
                                    placeholder="Your Address"
                                    defaultValue={data.fromAddress}
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
                                    defaultValue={data.clientName}
                                    placeholder="Client Name"
                                />
                                <p className="text-sm text-red-500">{fields.clientName.errors}</p>
                                <Input
                                    name={fields.clientEmail.name}
                                    key={fields.clientEmail.key}
                                    defaultValue={data.clientEmail}
                                    placeholder="Client Email"
                                />
                                <p className="text-sm text-red-500">{fields.clientEmail.errors}</p>
                                <Input
                                    name={fields.clientAddress.name}
                                    key={fields.clientAddress.key}
                                    defaultValue={data.clientAddress}
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
                                        onSelect={(date) => setSelectedDate(date || new Date())}
                                        mode="single"

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
                                defaultValue={data.dueDate.toString()}
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
                                    defaultValue={data.invoiceItemDescription}
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
                            defaultValue={data.note ?? undefined}
                            placeholder="Add your note right here..."
                        />
                        <p className="text-sm text-red-500">{fields.note.errors}</p>
                    </div>
                    <div className="flex justify-end items-center mt-6 ">
                        <div>
                            <SubmitButton text="Update Invoice" />
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    )
}