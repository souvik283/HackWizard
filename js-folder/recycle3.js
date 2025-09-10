const SUPABASE_URL = "https://pztaesrscyyqqqkuffag.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6dGFlc3JzY3l5cXFxa3VmZmFnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTcxODAxNjgsImV4cCI6MjA3Mjc1NjE2OH0.BVjb-0B_7qOevKezcuMTjwJcWlzmKLKYfVTKlVa6DEI";


const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Upload handler
document.getElementById("recycle_btn").addEventListener("click", async (e) => {
  e.preventDefault();


  let x = document.getElementsByClassName("input3")

  const image = document.getElementById("imageUpload")
  const image_file = image.files[0];
  const type = x[1].value
  const name = x[2].value;
  const description = x[3].value;
  const location = x[4].value;
  const date = `${new Date().getDate()}/${new Date().getMonth() + 1}/${new Date().getFullYear()}`
  console.log(image_file)
  console.log(name)
  console.log(description)
  console.log(location)
    console.log(type)
  console.log(date)

  //  Upload to storage bucket "photo"

//   const filePath = `reports/${Date.now()}-${image_file.name}`;

//   const { data, error } = await supabaseClient.storage
//     .from("photo")
//     .upload(filePath, image_file);

//   if (error) {
//     alert("❌ Upload failed!");
//     console.error(error);
//     return;
//   }

//   // Get public URL for preview / save to table
//   const { data: urlData } = supabaseClient.storage
//     .from("photo")
//     .getPublicUrl(filePath);

//   console.log("✅ Uploaded! Public URL:", urlData.publicUrl);
//   alert("✅ Success! Image uploaded.");


//   // Save into table "test"

//   const { error: insertError } = await supabaseClient
//     .from("Argha")
//     .insert([
//       {
//         des: description,
//         loc: location,
//         img_url: urlData.publicUrl,
//         date: date
//       }
//     ]);


//   if (insertError) {
//     alert(" Failed to save record!");
//     console.error(insertError);
//   } else {
//     alert(" Success! Saved to Supabase.");
//     setTimeout(() => {
//       window.location.reload();
//     }, 1000);
//   }

});