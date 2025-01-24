import React from "react"
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material"

type ResultPopupProps = {
  isOpen: boolean
  closeModal: () => void
  message: string
  isError: boolean
}

export default function ResultPopup({ isOpen, closeModal, message, isError }: ResultPopupProps) {
  return (
    <Dialog open={isOpen} onClose={closeModal}>
      <DialogTitle>{isError ? "เกิดข้อผิดพลาด" : "บันทึกข้อมูลเรียบร้อย"}</DialogTitle>
      <DialogContent>
        <Typography>{message}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color={isError ? "error" : "success"}>
          ปิด
        </Button>
      </DialogActions>
    </Dialog>
  )
}
