import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const scheduleItems = [
  { activity: "Arrival of Guest/Red Carpet (Be camera ready)", facilitator: "Special guest/Graduands/Parents/Staff" },
  { activity: "National Anthem/School Anthem", facilitator: "All Participants" },
  { activity: "Procecssion and Presentation of Graduates", facilitator: "Graduands" },
  { activity: "Opening Prayer", facilitator: "..." },
  { activity: "Welcome Address By Head Of Upper School", facilitator: "Mr. George Ibit" },
  { activity: "Graduation Remarks by the key note speaker", facilitator: "Mrs. Valentina Ofiepre Uchegbu Amnim Fasdir FCIPDM" },
  { activity: "Interlude", facilitator: "MC/DJ" },
  { activity: "AMADEUS University", facilitator: "AMADEUS University Reprecsentative" },
  { activity: "Book Launch", facilitator: "Princess Olanma Ndubuisi: Book Author" },
  { activity: "Craydel Group", facilitator: "..." },
  { activity: "Presentation of Gifts and Certificates to the Graduands", facilitator: "..." },
  { activity: "a) Presentation of Class Project", facilitator: "Chukwudi Onoh" },
  { activity: "b) Presentation of gift to Director", facilitator: "Usiere Umana" },
  { activity: "c) Presentation of gifts for Teachers to Mr. George", facilitator: "Chetachi Udenze" },
  { activity: "Presentation of Staff Awards", facilitator: "..." },
  { activity: "Valedictorian Speech", facilitator: "Valedictorian" },
  { activity: "Nile University of Nigeria", facilitator: "Nile University Reprecsentative" },
  { activity: "Cutting of Graduation Cake/Photographs", facilitator: "..." },
  { activity: "Closing Remark/Announcements", facilitator: "..." },
  { activity: "The National Pledge", facilitator: "All Participants" },
  { activity: "Refreshment", facilitator: "All Participants" },
];

const EVENT_DATE = new Date("2025-08-09T09:00:00");

const Schedule = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    organization: "",
    schedule: "",
    venue: "",
    speechQuality: "",
    speechRelevance: "",
    standoutSpeech: "",
    awardFairness: "",
    awardInclusivity: "",
    recognition: "",
    favoritePart: "",
    improvementAreas: "",
    recommend: "",
    comments: "",
  });

  function getTimeRemaining() {
    const now = new Date().getTime();
    const distance = EVENT_DATE.getTime() - now;
    if (distance <= 0) return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      total: distance,
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((distance / (1000 * 60)) % 60),
      seconds: Math.floor((distance / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      await addDoc(collection(db, "feedbacks"), formData);
      alert("Thank you for your feedback!");
      setOpen(false);
      setFormData({
        name: "",
        role: "",
        organization: "",
        schedule: "",
        venue: "",
        speechQuality: "",
        speechRelevance: "",
        standoutSpeech: "",
        awardFairness: "",
        awardInclusivity: "",
        recognition: "",
        favoritePart: "",
        improvementAreas: "",
        recommend: "",
        comments: "",
      });
    } catch (error) {
      console.error("Error saving feedback:", error);
      alert("Failed to submit feedback. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Show countdown if the event has not started
  if (timeLeft.total > 0) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          color: "white",
          backgroundImage:
            "linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url('https://images.unsplash.com/photo-1529333166437-7750a6dd5a70')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          p: 3,
        }}
      >
        <Typography variant="h4" gutterBottom>
          🎓 Our Graduation Event is Coming Soon!
        </Typography>
        <Typography variant="h6" gutterBottom>
          Countdown to Event
        </Typography>
        <Typography
          variant="h2"
          sx={{
            fontWeight: "bold",
            letterSpacing: "2px",
            backgroundColor: "rgba(0,0,0,0.3)",
            p: 2,
            borderRadius: 3,
            mt: 3,
          }}
        >
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
        </Typography>
      </Box>
    );
  }

  // Event Day: Show schedule and feedback
  return (
    <Box sx={{ py: 5 }}>
      {/* <Box sx={{ py: 5, textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            🎓 About the Event
          </Typography>
          <Typography variant="body1">
            Join us for a day of inspiring talks, networking opportunities, and breakthrough innovations in tech, education, and business.
          </Typography>
      </Box> */}
      <Typography variant="h5" gutterBottom textAlign="center">
        Programme Schedule
      </Typography>

      <List>
        {scheduleItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={item.activity}
                secondary={item.facilitator}
                primaryTypographyProps={{ fontWeight: "bold" }}
              />
            </ListItem>
            {index < scheduleItems.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>

      <Box textAlign="center" mt={4}>
        <Typography>Please leave a feedback/comment</Typography>
        <Button 
          variant="contained" 
          onClick={() => setOpen(true)}
          sx={{backgroundColor: "#bca04dff"}}
        >
          Give Feedback
        </Button>
      </Box>

      {/* Feedback Dialog */}
      <Dialog open={open} onClose={() => !isSubmitting && setOpen(false)} fullWidth maxWidth="md">
        <DialogTitle fontWeight="bold">📝 Feedback/Comments</DialogTitle>
        <DialogContent dividers sx={{ maxHeight: "75vh" }}>
          {/* A. General Information */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            A. General Information
          </Typography>
          <TextField fullWidth label="Name (Optional)" name="name" value={formData.name} onChange={handleChange} margin="dense" />
          <TextField fullWidth label="Role/Relation to Event (student, parent, staff, guest)" name="role" value={formData.role} onChange={handleChange} margin="dense" />

          {/* B. Event Organization */}
          <Typography variant="subtitle1" mt={3} fontWeight="bold">B. Event Organization</Typography>
          <FormControl fullWidth margin="dense">
            <FormLabel>How would you rate the overall organization?</FormLabel>
            <RadioGroup name="organization" value={formData.organization} onChange={handleChange}>
              <FormControlLabel value="Excellent" control={<Radio />} label="Excellent" />
              <FormControlLabel value="Good" control={<Radio />} label="Good" />
              <FormControlLabel value="Average" control={<Radio />} label="Average" />
              <FormControlLabel value="Fair" control={<Radio />} label="Fair" />
              <FormControlLabel value="Poor" control={<Radio />} label="Poor" />
            </RadioGroup>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel>Was the event schedule followed appropriately?</FormLabel>
            <RadioGroup name="schedule" value={formData.schedule} onChange={handleChange}>
              <FormControlLabel value="Well-timed" control={<Radio />} label="Yes, it was well-timed" />
              <FormControlLabel value="Acceptable delays" control={<Radio />} label="Some delays but acceptable" />
              <FormControlLabel value="Poorly timed" control={<Radio />} label="No, it was poorly timed" />
            </RadioGroup>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel>How satisfied were you with the venue and sitting arrangements?</FormLabel>
            <RadioGroup name="venue" value={formData.venue} onChange={handleChange}>
              <FormControlLabel value="Very Satisfied" control={<Radio />} label="Very Satisfied" />
              <FormControlLabel value="Satisfied" control={<Radio />} label="Satisfied" />
              <FormControlLabel value="Neutral" control={<Radio />} label="Neutral" />
              <FormControlLabel value="Dissatisfied" control={<Radio />} label="Dissatisfied" />
              <FormControlLabel value="Very Dissatisfied" control={<Radio />} label="Very Dissatisfied" />
            </RadioGroup>
          </FormControl>

          {/* C. Speech Session */}
          <Typography variant="subtitle1" mt={3} fontWeight="bold">C. Speech Session</Typography>
          <FormControl fullWidth margin="dense">
            <FormLabel>How would you rate the quality of the speeches?</FormLabel>
            <RadioGroup name="speechQuality" value={formData.speechQuality} onChange={handleChange}>
              <FormControlLabel value="Excellent" control={<Radio />} label="Excellent" />
              <FormControlLabel value="Good" control={<Radio />} label="Good" />
              <FormControlLabel value="Average" control={<Radio />} label="Average" />
              <FormControlLabel value="Fair" control={<Radio />} label="Fair" />
              <FormControlLabel value="Poor" control={<Radio />} label="Poor" />
            </RadioGroup>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel>Were the speeches relevant and inspiring?</FormLabel>
            <RadioGroup name="speechRelevance" value={formData.speechRelevance} onChange={handleChange}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="Somewhat" control={<Radio />} label="Somewhat" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <TextField label="Which speech stood out and why?" multiline fullWidth name="standoutSpeech" value={formData.standoutSpeech} onChange={handleChange} margin="dense" />

          {/* D. Award Session */}
          <Typography variant="subtitle1" mt={3} fontWeight="bold">D. Award Session</Typography>
          <FormControl fullWidth margin="dense">
            <FormLabel>Was the award distribution orderly and fair?</FormLabel>
            <RadioGroup name="awardFairness" value={formData.awardFairness} onChange={handleChange}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="Somewhat" control={<Radio />} label="Somewhat" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel>Were the award categories appropriate and inclusive?</FormLabel>
            <RadioGroup name="awardInclusivity" value={formData.awardInclusivity} onChange={handleChange}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
              <FormControlLabel value="Not sure" control={<Radio />} label="Not sure" />
            </RadioGroup>
          </FormControl>
          <FormControl fullWidth margin="dense">
            <FormLabel>How would you rate the recognition given to students/staff?</FormLabel>
            <RadioGroup name="recognition" value={formData.recognition} onChange={handleChange}>
              <FormControlLabel value="Excellent" control={<Radio />} label="Excellent" />
              <FormControlLabel value="Good" control={<Radio />} label="Good" />
              <FormControlLabel value="Fair" control={<Radio />} label="Fair" />
              <FormControlLabel value="Poor" control={<Radio />} label="Poor" />
            </RadioGroup>
          </FormControl>

          {/* E. Overall Experience */}
          <Typography variant="subtitle1" mt={3} fontWeight="bold">E. Overall Experience</Typography>
          <TextField fullWidth label="What was your favorite part in the event?" name="favoritePart" multiline minRows={2} value={formData.favoritePart} onChange={handleChange} margin="dense" />
          <TextField fullWidth label="What area(s) need improvement?" name="improvementAreas" multiline minRows={2} value={formData.improvementAreas} onChange={handleChange} margin="dense" />
          <FormControl fullWidth margin="dense">
            <FormLabel>Would you attend or recommend this event?</FormLabel>
            <RadioGroup name="recommend" value={formData.recommend} onChange={handleChange}>
              <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="No" control={<Radio />} label="No" />
              <FormControlLabel value="Maybe" control={<Radio />} label="Maybe" />
            </RadioGroup>
          </FormControl>
          <TextField fullWidth label="Additional comments or suggestions" name="comments" multiline minRows={2} value={formData.comments} onChange={handleChange} margin="dense" />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary" disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            variant="contained" 
            onClick={handleSubmit} disabled={isSubmitting}
            sx={{backgroundColor: "#bca04dff"}}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Schedule;
