import React, { useState } from "react";
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
  { time: "09:00 AM", activity: "Arrival of Guest/Red Carpet (Be camera ready)" },
  { time: "09:30 AM", activity: "National Anthem/School Anthem" },
  { time: "09:40 AM", activity: "Procecssion and Presentation of Graduates" },
  { time: "10:00 AM", activity: "Opening Prayer" },
  { time: "10:10 AM", activity: "Welcome Address By Head Of Upper School: Mr: George Ibit" },
  { time: "10:15 AM", activity: "Graduation Remarks by the key note speaker:" },
  { time: "10:45 AM", activity: "Interlude" },
  { time: "10:50 AM", activity: "Sponsor Space" },
  { time: "11:00 AM", activity: "Presentation of Staff Awards" },
  { time: "11:45 AM", activity: "Valedictorian Speech" },
  { time: "12:00 PM", activity: "Sponsor Space" },
  { time: "12:10 PM", activity: "Cutting of Graduation Cake/Photographs" },
  { time: "12:20 PM", activity: "Closing Remark/Announcements" },
  { time: "12:25 PM", activity: "The National Pledge" },
  { time: "12:30 PM", activity: "Refreshment" },
];

const Schedule = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
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

  return (
    <Box sx={{ py: 5 }}>
      <Typography variant="h5" gutterBottom textAlign="center">
        Programme Schedule
      </Typography>

      <List>
        {scheduleItems.map((item, index) => (
          <React.Fragment key={index}>
            <ListItem>
              <ListItemText
                primary={item.activity}
                secondary={item.time}
                primaryTypographyProps={{ fontWeight: "bold" }}
              />
            </ListItem>
            {index < scheduleItems.length - 1 && <Divider />}
          </React.Fragment>
        ))}
      </List>

      <Box textAlign="center" mt={4}>
        <Typography>Please leave a feedback/comment</Typography>
        <Button variant="contained" onClick={() => setOpen(true)}>
          Give Feedback
        </Button>
      </Box>

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
          <TextField fullWidth label="What was your favorite part?" name="favoritePart" multiline minRows={2} value={formData.favoritePart} onChange={handleChange} margin="dense" />
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
          <Button variant="contained" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Schedule;






// import React, { useState } from "react";
// import {
//   Typography,
//   Box,
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   FormControl,
//   FormLabel,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
// } from "@mui/material";
// import { db } from "../firebase";
// import { addDoc, collection } from "firebase/firestore";

// const scheduleItems = [
//   { time: "09:00 AM", activity: "Arrival of Guest/Red Carpet (Be camera ready)" },
//   { time: "09:30 AM", activity: "National Anthem/School Anthem" },
//   { time: "09:45 AM", activity: "Procecssion and Presentation of Graduates" },
//   { time: "10:30 AM", activity: "Opening Prayer" },
//   { time: "01:00 PM", activity: "Welcome Address By Head Of Upper School: Mr: George Ibit" },
//   { time: "12:00 PM", activity: "Graduation Remarks by the key note speaker:" },
//   { time: "12:00 PM", activity: "Interlude" },
//   { time: "03:00 PM", activity: "Sponsor Space" },
//   { time: "03:00 PM", activity: "Presentation of Staff Awards" },
//   { time: "03:00 PM", activity: "Valedictorian Speech" },
//   { time: "03:00 PM", activity: "Sponsor Space" },
//   { time: "03:00 PM", activity: "Cutting of Graduation Cake/Photographs" },
//   { time: "03:00 PM", activity: "Closing Remark/Announcements" },
//   { time: "03:00 PM", activity: "The National Pledge" },
//   { time: "03:00 PM", activity: "Refreshment" },
// ];

// const Schedule = () => {
//   const [open, setOpen] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     role: "",
//     organization: "",
//     schedule: "",
//     venue: "",
//     speechQuality: "",
//     speechRelevance: "",
//     standoutSpeech: "",
//     awardFairness: "",
//     awardInclusivity: "",
//     recognition: "",
//     favoritePart: "",
//     improvementAreas: "",
//     recommend: "",
//     comments: "",
//   });

//   const handleChange = (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const handleSubmit = async () => {
//     try {
//       await addDoc(collection(db, "feedbacks"), formData);
//     // console.log("Submitted Feedback:", formData);
//     alert("Thank you for your feedback!");
//     setOpen(false);
//     setFormData({
//       name: "",
//       role: "",
//       organization: "",
//       schedule: "",
//       venue: "",
//       speechQuality: "",
//       speechRelevance: "",
//       standoutSpeech: "",
//       awardFairness: "",
//       awardInclusivity: "",
//       recognition: "",
//       favoritePart: "",
//       improvementAreas: "",
//       recommend: "",
//       comments: "",
//     });
//   } catch (error) {
//     console.error("Error saving feedback:", error);
//     alert("failed to submit feedback. Please try again.");
//   }
// };

//   return (
//     <Box sx={{ py: 5 }}>
//       <Typography variant="h5" gutterBottom textAlign="center">
//         Programme Schedule
//       </Typography>

//       <List>
//         {scheduleItems.map((item, index) => (
//           <React.Fragment key={index}>
//             <ListItem>
//               <ListItemText
//                 primary={item.time}
//                 secondary={item.activity}
//                 primaryTypographyProps={{ fontWeight: "bold" }}
//               />
//             </ListItem>
//             {index < scheduleItems.length - 1 && <Divider />}
//           </React.Fragment>
//         ))}
//       </List>

//       <Box textAlign="center" mt={4}>
//         <Typography>Please leave a feedback/comment </Typography>
//         <Button variant="contained" onClick={() => setOpen(true)}>
//           Give Feedback
//         </Button>
//       </Box>

//       {/* Feedback Form Dialog */}
//       <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="md">
//         <DialogTitle fontWeight="bold">📝 Feedback/Comments </DialogTitle>
//         <DialogContent dividers sx={{ maxHeight: "75vh" }}>
//           <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
//             A. General Information
//           </Typography>
//           <TextField
//             fullWidth
//             label="Name (Optional)"
//             name="name"
//             value={formData.name}
//             onChange={handleChange}
//             margin="dense"
//           />
//           <TextField
//             fullWidth
//             label="Role/Relation to Event (student, parent, staff, guest)"
//             name="role"
//             value={formData.role}
//             onChange={handleChange}
//             margin="dense"
//           />

//           <Typography variant="subtitle1" mt={3} fontWeight="bold">
//             B. Event Organization
//           </Typography>

//           <FormControl fullWidth margin="dense">
//             <FormLabel>How would you rate the overall organization?</FormLabel>
//             <RadioGroup name="organization" value={formData.organization} onChange={handleChange}>
//               <FormControlLabel value="Excellent" control={<Radio />} label="Excellent" />
//               <FormControlLabel value="Good" control={<Radio />} label="Good" />
//               <FormControlLabel value="Average" control={<Radio />} label="Average" />
//               <FormControlLabel value="Fair" control={<Radio />} label="Fair" />
//               <FormControlLabel value="Poor" control={<Radio />} label="Poor" />
//             </RadioGroup>
//           </FormControl>

//           <FormControl fullWidth margin="dense">
//             <FormLabel>Was the event schedule followed appropriately?</FormLabel>
//             <RadioGroup name="schedule" value={formData.schedule} onChange={handleChange}>
//               <FormControlLabel value="Well-timed" control={<Radio />} label="Yes, it was well-timed" />
//               <FormControlLabel value="Acceptable delays" control={<Radio />} label="Some delays but acceptable" />
//               <FormControlLabel value="Poorly timed" control={<Radio />} label="No, it was poorly timed" />
//             </RadioGroup>
//           </FormControl>

//           <FormControl fullWidth margin="dense">
//             <FormLabel>How satisfied were you with the venue and sitting arrangements?</FormLabel>
//             <RadioGroup name="venue" value={formData.venue} onChange={handleChange}>
//               <FormControlLabel value="Very Satisfied" control={<Radio />} label="Very Satisfied" />
//               <FormControlLabel value="Satisfied" control={<Radio />} label="Satisfied" />
//               <FormControlLabel value="Neutral" control={<Radio />} label="Neutral" />
//               <FormControlLabel value="Dissatisfied" control={<Radio />} label="Dissatisfied" />
//               <FormControlLabel value="Very Dissatisfied" control={<Radio />} label="Very Dissatisfied" />
//             </RadioGroup>
//           </FormControl>

//           <Typography variant="subtitle1" mt={3} fontWeight="bold">
//             C. Speech Session
//           </Typography>

//           <FormControl fullWidth margin="dense">
//             <FormLabel>How would you rate the quality of the speeches?</FormLabel>
//             <RadioGroup name="speechQuality" value={formData.speechQuality} onChange={handleChange}>
//               <FormControlLabel value="Excellent" control={<Radio />} label="Excellent" />
//               <FormControlLabel value="Good" control={<Radio />} label="Good" />
//               <FormControlLabel value="Average" control={<Radio />} label="Average" />
//               <FormControlLabel value="Fair" control={<Radio />} label="Fair" />
//               <FormControlLabel value="Poor" control={<Radio />} label="Poor" />
//             </RadioGroup>
//           </FormControl>

//           <FormControl fullWidth margin="dense">
//             <FormLabel>Were the speeches relevant and inspiring?</FormLabel>
//             <RadioGroup name="speechRelevance" value={formData.speechRelevance} onChange={handleChange}>
//               <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
//               <FormControlLabel value="Somewhat" control={<Radio />} label="Somewhat" />
//               <FormControlLabel value="No" control={<Radio />} label="No" />
//             </RadioGroup>
//           </FormControl>

//           <TextField
//             label="Which speech stood out and why?"
//             multiline
//             fullWidth
//             name="standoutSpeech"
//             value={formData.standoutSpeech}
//             onChange={handleChange}
//             margin="dense"
//           />

//           <Typography variant="subtitle1" mt={3} fontWeight="bold">
//             D. Award Session
//           </Typography>

//           <FormControl fullWidth margin="dense">
//             <FormLabel>Was the award distribution orderly and fair?</FormLabel>
//             <RadioGroup name="prizeFairness" value={formData.awardFairness} onChange={handleChange}>
//               <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
//               <FormControlLabel value="Somewhat" control={<Radio />} label="Somewhat" />
//               <FormControlLabel value="No" control={<Radio />} label="No" />
//             </RadioGroup>
//           </FormControl>

//           <FormControl fullWidth margin="dense">
//             <FormLabel>Were the award categories appropriate and inclusive?</FormLabel>
//             <RadioGroup name="awardInclusivity" value={formData.awardInclusivity} onChange={handleChange}>
//               <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
//               <FormControlLabel value="No" control={<Radio />} label="No" />
//               <FormControlLabel value="Not sure" control={<Radio />} label="Not sure" />
//             </RadioGroup>
//           </FormControl>

//           <FormControl fullWidth margin="dense">
//             <FormLabel>How would you rate the recognition given to students/staff?</FormLabel>
//             <RadioGroup name="recognition" value={formData.recognition} onChange={handleChange}>
//               <FormControlLabel value="Excellent" control={<Radio />} label="Excellent" />
//               <FormControlLabel value="Good" control={<Radio />} label="Good" />
//               <FormControlLabel value="Fair" control={<Radio />} label="Fair" />
//               <FormControlLabel value="Poor" control={<Radio />} label="Poor" />
//             </RadioGroup>
//           </FormControl>

//           <Typography variant="subtitle1" mt={3} fontWeight="bold">
//             E. Overall Experience
//           </Typography>

//           <TextField
//             fullWidth
//             label="What was your favorite part?"
//             name="favoritePart"
//             multiline
//             minRows={2}
//             value={formData.favoritePart}
//             onChange={handleChange}
//             margin="dense"
//           />
//           <TextField
//             fullWidth
//             label="What area(s) need improvement?"
//             name="improvementAreas"
//             multiline
//             minRows={2}
//             value={formData.improvementAreas}
//             onChange={handleChange}
//             margin="dense"
//           />

//           <FormControl fullWidth margin="dense">
//             <FormLabel>Would you attend or recommend this event?</FormLabel>
//             <RadioGroup name="recommend" value={formData.recommend} onChange={handleChange}>
//               <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
//               <FormControlLabel value="No" control={<Radio />} label="No" />
//               <FormControlLabel value="Maybe" control={<Radio />} label="Maybe" />
//             </RadioGroup>
//           </FormControl>

//           <TextField
//             fullWidth
//             label="Additional comments or suggestions"
//             name="comments"
//             multiline
//             minRows={2}
//             value={formData.comments}
//             onChange={handleChange}
//             margin="dense"
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={() => setOpen(false)} color="secondary">
//             Cancel
//           </Button>
//           <Button variant="contained" onClick={handleSubmit}>
//             Submit
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Schedule;
