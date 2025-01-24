"use client"

import type React from "react"
import { useEffect, useState } from "react"
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Container,
  Paper,
  Typography,
  SelectChangeEvent,
  Autocomplete,
} from "@mui/material"
import projectsJson from "./data/projects.json"
import { saveCustomerData } from "./utils/api"
import ReviewPopup from "./components/ReviewPopup"
import ResultPopup from "./components/ResultPopup"
import { useProjects } from "./utils/hooks"
import { ProjectOptionProps } from "./utils/type"

export default function ApplicationForm() {
  const [formData, setFormData] = useState({
    ProjectID: "",
    ProjectName: "",
    ContactChannelID: 21,
    ContactTypeID: 35,
    RefID: 67175,
    RefDate: new Date().toISOString(),
    Fname: "",
    Lname: "",
    Tel: "",
    Email: "",
    ModelInterest: "",
    PriceInterest: "",
    PurchasePurpose: "",
    LineID: "",
    AgencyName: "",
    Campaign: "",
    utmSource: "direct" ,
    utmMedium: "",
    utmCampaign: "",
    utmTerm: "",
    FollowUpID: 42,
    FlagContactAccept: 1,
    FlagPersonalAccept: 1
  })

  const [isReviewOpen, setIsReviewOpen] = useState(false)
  const [isResultOpen, setIsResultOpen] = useState(false)
  const [resultMessage, setResultMessage] = useState("")
  const [isError, setIsError] = useState(false)
  const { projects, isLoading, error } = useProjects()

  const handleTextChange = (field: string) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSelectChange = (field: string) => (
    event: SelectChangeEvent
  ) => {
    setFormData((prev) => ({ ...prev, [field]: event.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Validate required fields
    if (!formData.ProjectID) {
      setResultMessage("กรุณาเลือกโครงการ")
      setIsError(true)
      setIsResultOpen(true)
      return
    }

    if (!formData.Fname.trim()) {
      setResultMessage("กรุณากรอกชื่อ")
      setIsError(true) 
      setIsResultOpen(true)
      return
    }

    if (!formData.Lname.trim()) {
      setResultMessage("กรุณากรอกนามสกุล")
      setIsError(true)
      setIsResultOpen(true)
      return
    }

    // Validate phone number format
    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(formData.Tel)) {
      setResultMessage("กรุณากรอกเบอร์โทรศัพท์ให้ถูกต้อง")
      setIsError(true)
      setIsResultOpen(true)
      return
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.Email && !emailRegex.test(formData.Email)) {
      setResultMessage("กรุณากรอกอีเมลให้ถูกต้อง")
      setIsError(true)
      setIsResultOpen(true)
      return
    }
    setIsReviewOpen(true)
  }

  const handleConfirm = async () => {
    setIsReviewOpen(false)
    try {
      await saveCustomerData(formData)
      setResultMessage("บันทึกข้อมูลเรียบร้อย")
      setIsError(false)
      //clearForm()
    } catch (error) {
      setResultMessage("เกิดข้อผิดพลาดในการบันทึกข้อมูล")
      setIsError(true)
    }
    setIsResultOpen(true)
  }

  const clearForm = () => {
    setFormData((prevState) => ({
      ...prevState,
      Fname: "",
      Lname: "",
      Tel: "",
      Email: "",
      ModelInterest: "",
      PriceInterest: "",
      PurchasePurpose: "",
      LineID: ""
    }))
  }

  return (
    <Container maxWidth="md">
      <Paper elevation={2} className="p-4 md:py-10 my-7 md:mt-12 md:mb-10 rounded-lg" variant="outlined">
        <div className="w-full md:w-4/5 mx-auto">
          <Typography variant="h1" gutterBottom align="center" fontWeight="medium" className="text-xl md:text-2xl my-3 md:my-5">
          แบบฟอร์มกรอกรายละเอียด Lead
          </Typography>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth margin="normal">
              <Autocomplete
                options={projectsJson}
                getOptionLabel={(option: ProjectOptionProps) => option.ProjectName}
                getOptionKey={(option: ProjectOptionProps) => option.ProjectID}
                onChange={(event, value) => {
                  if (value) {
                    setFormData(prev => ({ ...prev, ProjectID: value.ProjectID.toString(), ProjectName: value.ProjectName }))
                  }
                }}
                renderInput={(params) => <TextField {...params} label="เลือกโครงการ" />}
              />
            </FormControl>

            {[
              { field: "Fname", type: "text", label: "ชื่อ", required: true },
              { field: "Lname", type: "text", label: "นามสกุล", required: true },
              { field: "Tel", type: "tel", label: "เบอร์โทรศัพท์", required: true },
              { field: "Email", type: "email", label: "อีเมล", required: true },
              { field: "ModelInterest", type: "text", label: "ประเภทห้อง" },
              { field: "PriceInterest", type: "text", label: "งบประมาณ" },
              { field: "PurchasePurpose", type: "text", label: "วัตถุประสงค์" },
              { field: "AgencyName", type: "text", label: "ชื่อ Agency", required: true },
              { field: "LineID", type: "text", label: "Line ID" },
              { field: "Campaign", type: "text", label: "ชื่อแคมเปญ" },
              { field: "utmSource", type: "text", label: "utm_source", required: true},
              { field: "utmMedium", type: "text", label: "utm_medium"},
              { field: "utmCampaign", type: "text", label: "utm_campaign"},
              { field: "utmTerm", type: "text", label: "utm_term" },
            ].map((field) => (
              <FormControl key={field.field} fullWidth margin="normal">
                <TextField
                  label={field.label}
                  type={field.type}
                  fullWidth
                  margin="normal" 
                  name={field.field}
                  value={formData[field.field as keyof typeof formData] || ''}
                  onChange={handleTextChange(field.field)}
                  required={field.required}
                />
              </FormControl>
            ))}

            <Button type="submit" variant="contained" color="primary" size="large" fullWidth style={{ marginTop: "1rem" }}>
              ส่งข้อมูล
            </Button>
          </form>
        </div>
      </Paper>

      <ReviewPopup
        isOpen={isReviewOpen}
        closeModal={() => setIsReviewOpen(false)}
        formData={Object.fromEntries(
          Object.entries(formData).map(([key, value]) => [key, String(value)])
        )}
        onConfirm={handleConfirm}
      />

      <ResultPopup
        isOpen={isResultOpen}
        closeModal={() => setIsResultOpen(false)}
        message={resultMessage}
        isError={isError}
      />
    </Container>
  )
}
