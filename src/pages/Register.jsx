import React, { useState } from "react";
import Image from "../assets/icon.png";
import { Logo } from "../components";
import axios from "axios";
import { Button, Form, Input, message, Watermark } from "antd";
import { Link, useNavigate } from "react-router-dom";

const rules = [
  {
    required: true,
    message: "Please input again password!",
  },
  ({ getFieldValue }) => ({
    validator(_, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject(new Error("Passwords must be the same!"));
    },
  }),
];

export default function Register() {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const res = await axios.post(
        process.env.REACT_APP_API_URL + "/api/register",
        values
      );
      if (res.status === 200) {
        message.success("Register successful");
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      if (error.response.status === 400) {
        message.error("Enter unique username");
        setLoading(false);
      }
    }
  };

  return (
    <div className="relative">
      <Watermark
        height={30}
        width={30}
        image={Image}
        className="h-screen blur-sm bg-white"
      />
      <div className="w-[400px] rounded-md p-5 mx-auto bg-[#f9f9f9] absolute top-1/2 left-1/2 -ml-[200px] -mt-[296px] shadow-2xl">
        <div className="mb-5 flex justify-center">
          <Link to="/">
            <Logo />
          </Link>
        </div>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Name"
            name={"name"}
            rules={[
              {
                required: true,
                message: "Please input name!",
              },
            ]}
          >
            <Input placeholder="Safvan Avci" />
          </Form.Item>
          <Form.Item
            label="Username"
            name={"username"}
            rules={[
              {
                required: true,
                message: "Please input username!",
              },
              {
                validator: (_, value) =>
                  !value.includes(" ")
                    ? Promise.resolve()
                    : Promise.reject(new Error("No spaces allowed")),
              },
            ]}
          >
            <Input placeholder="safvanavci" />
          </Form.Item>
          <Form.Item
            label="Password"
            name={"password"}
            rules={[
              {
                required: true,
                message: "Please input password!",
              },
            ]}
          >
            <Input.Password placeholder="*****" className="bg-inherit" />
          </Form.Item>
          <Form.Item
            label="Password Again"
            name={"passwordAgain"}
            dependencies={["password"]}
            rules={rules}
          >
            <Input.Password placeholder="*****" className="bg-inherit" />
          </Form.Item>
          <Form.Item label="Image" name={"image"} dependencies={["password"]}>
            <Input placeholder="Image Link" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              loading={loading}
              className="w-full"
            >
              Sign up
            </Button>
          </Form.Item>
        </Form>
        <div className="flex text-xs gap-x-2">
          <p>{"Do you have an account? "}</p>
          <Link className="text-[#5bcadf]" to="/login">
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
