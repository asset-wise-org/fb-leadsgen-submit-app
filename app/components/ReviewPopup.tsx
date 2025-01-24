import React from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material"

type ReviewPopupProps = {
  isOpen: boolean
  closeModal: () => void
  formData: Record<string, string>
  onConfirm: () => void
}

export default function ReviewPopup({ isOpen, closeModal, formData, onConfirm }: ReviewPopupProps) {
  return (
    <Dialog open={isOpen} onClose={closeModal} fullWidth={true} maxWidth="sm">
      <DialogTitle sx={{textAlign: "center"}}>ตรวจสอบข้อมูล</DialogTitle>
      <DialogContent>
        <div className="grid gap-2">
          {Object.entries(formData).map(([key, value]) => (
            <Typography key={key} variant="body1">
              {key === 'project' ? <strong>โครงการ</strong> : <strong>{key.charAt(0).toUpperCase() + key.slice(1).replace("-", " ")}</strong>}: {value}
            </Typography>
          ))}
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="secondary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            onConfirm()
            closeModal()
          }}
          color="primary"
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  )
}

