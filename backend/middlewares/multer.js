// import multer from "multer";

// const storage=multer.diskStorage({
//     destination:"uploads",
//     filename:(req,file,cb)=>{
//         return cb(null, `${Date.now()}${file.originalname}`);
//     }
// })

// export const upload=multer({storage:storage});

import multer from 'multer';

const storage = multer.memoryStorage(); // changed from diskStorage to memoryStorage

const upload = multer({ storage:storage });

export default upload;