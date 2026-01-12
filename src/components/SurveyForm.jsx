import Header from "./ui/Header";
import { useState } from "react";
import movies from "../data/movieData";
import { Button } from "./ui/Button";
import { RefreshCcw, Send, CircleCheckBig } from "lucide-react";
import MovieList from "./MovieList";

function SurveyForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [titleSelect, setTitleSelect] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    name: "",
    email: "",
    titleSelect: "",
  });
  const [comment, setComment] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    let caughtError = false;
    let newErrorMessage = {
      name: "",
      email: "",
      titleSelect: "",
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name) {
      caughtError = true;
      newErrorMessage.name = "กรุณากรอกชื่อ";
    }

    if (!email) {
      caughtError = true;
      newErrorMessage.email = "กรุณากรอกอีเมล";
    } else if (!emailRegex.test(email)) {
      caughtError = true;
      newErrorMessage.email = "รูปแบบอีเมลไม่ถูกต้อง";
    }

    if (!titleSelect) {
      caughtError = true;
      newErrorMessage.titleSelect = "กรุณาเลือกหนัง";
    }

    if (caughtError) {
      setErrorMessage(newErrorMessage);
      return;
    }

    setErrorMessage({ name: "", email: "", titleSelect: "" });
    setSubmitted(true);
  }

  function handleResetForm() {
    setName("");
    setEmail("");
    setTitleSelect("");
    setComment("");
    setErrorMessage({
      name: "",
      email: "",
      titleSelect: "",
    });
    setSubmitted(false);
  }

  return (
    <>
      <Header />
      {!submitted ? (
        <form
          className="w-full rounded-b-lg shadow-2xl bg-white overflow-hidden"
          onSubmit={handleSubmit}
          noValidate
        >
          <div className="flex flex-col gap-6 p-6 text-left w-[450px]">
            <div className="flex flex-col gap-2 ">
              <label className="font-medium text-gray-900">
                ชื่อ <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="กรุณากรอกชื่อของคุณ"
                value={name}
                className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                  errorMessage.name
                    ? "border border-red-500 focus:ring-red-200"
                    : "border border-gray-300 focus:ring-blue-200"
                }`}
                onChange={(event) => setName(event.target.value)}
              />
              {errorMessage.name && (
                <p className="text-red-500">{errorMessage.name}</p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="font-medium text-gray-900">
                อีเมล <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                className={`border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                  errorMessage.email
                    ? "border border-red-500 focus:ring-red-200"
                    : "border border-gray-300 focus:ring-blue-200"
                }`}
                onChange={(event) => setEmail(event.target.value)}
              />
              {errorMessage.email && (
                <p className="text-red-500">{errorMessage.email}</p>
              )}
            </div>
            <div
              className={`flex flex-col gap-3 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 ${
                errorMessage.titleSelect
                  ? "border border-red-500 focus:ring-red-200"
                  : "border border-gray-300 focus:ring-blue-200"
              }`}
            >
              <label className="font-medium text-gray-900">
                เลือกหนังที่คุณชอบ <span className="text-red-500">*</span>
              </label>
              <MovieList
                movies={movies}
                titleSelect={titleSelect}
                setTitleSelect={setTitleSelect}
              />
            </div>
            {errorMessage.titleSelect && (
              <p className="text-red-500">{errorMessage.titleSelect}</p>
            )}
            <div className="flex flex-col gap-3">
              <label className="font-medium text gray-900">
                ความคิดเห็นเกี่ยวกับหนัง
              </label>
              <textarea
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="พิมพ์ความคิดเห็นของคุณที่นี่..."
                rows={3}
                className="w-full border rounded-md px-3 py-2 resize-y min-h-[80px] max-h-[300px] focus:outline-none focus:ring-2  "
              ></textarea>
            </div>
          </div>
          <div className="flex justify-between border-t p-6">
            <Button
              type="button"
              className="btn-refresh"
              imgSrc={<RefreshCcw size={16} />}
              text="รีเซ็ต"
              onClick={handleResetForm}
            />
            <Button
              type="submit"
              className="btn-submit"
              imgSrc={<Send size={16} />}
              text="ส่งแบบสำรวจ"
            />
          </div>
        </form>
      ) : (
        <div className="flex flex-col gap-6 p-6 text-left w-[450px] bg-white shadow-2xl rounded-b-md">
          <div className="border border-green-300 bg-green-50 rounded-lg p-5 space-y-3">
            <div className="flex items-center gap-2 text-green-700 font-semibold">
              <CircleCheckBig size={16} />
              <span>ส่งแบบสำรวจสำเร็จ!</span>
            </div>

            <div className="text-sm w-full text-left space-y-3">
              <div className="grid grid-cols-[100px_1fr] gap-2">
                <span className="font-medium text-gray-500">ชื่อ:</span>
                <span>{name}</span>
              </div>

              <div className="grid grid-cols-[100px_1fr] gap-2">
                <span className="font-medium text-gray-500">อีเมล:</span>
                <span>{email}</span>
              </div>

              <div className="grid grid-cols-[100px_1fr] gap-2">
                <span className="font-medium text-gray-500">หนังที่เลือก:</span>
                <span className="text-purple-600 font-medium">
                  {movies.find((m) => m.id === titleSelect)?.title}
                </span>
              </div>

              {comment && (
                <>
                  <hr className="border-t border-green-200 my-3" />
                  <div className="space-y-1">
                    <p className="font-medium text-gray-500">ความคิดเห็น:</p>
                    <div className="bg-white rounded-md border px-3 py-2 text-gray-800 min-h-[40px]">
                      {comment}
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="text-white w-full">
            <Button
              className="w-full flex items-center justify-center gap-2"
              imgSrc={<RefreshCcw size={16} />}
              text="ทำแบบสำรวจใหม่"
              onClick={handleResetForm}
            />
          </div>
        </div>
      )}
    </>
  );
}
export default SurveyForm;
