import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Code,
  Divider,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { app } from "./api";
import Layout from "./components/Layout";

function App() {
  const [count, setCount] = useState(0);
  const [hello, setHello] = useState<string | null>(null);

  useEffect(() => {
    app
      .getHello()
      .then((res) => {
        setHello(String(res._data ?? ""));
        console.log("vtzac demo:", res._data);
      })
      .catch((err) => {
        console.error("vtzac demo error:", err);
      });
  }, []);

  // Dark mode is now controlled globally in Layout

  return (
    <Layout>
      <div className="mx-auto w-full max-w-3xl">
        <Card className="bg-content1">
          <CardHeader className="flex flex-col items-start gap-2 p-4">
            <div className="flex w-full items-center justify-start">
              <div className="flex items-center gap-3">
                <Chip variant="flat" color="primary">
                  Electron
                </Chip>
                <Chip variant="flat" color="secondary">
                  Vite
                </Chip>
                <Chip variant="flat" color="success">
                  React
                </Chip>
                <Chip variant="flat" color="warning">
                  HeroUI
                </Chip>
              </div>
            </div>
            <h1 className="text-2xl font-semibold">Browser AI</h1>
            <p className="text-default-500">
              Modern base page rebuilt with Tailwind + HeroUI
            </p>
          </CardHeader>
          <Divider />
          <CardBody className="space-y-4 p-4">
            <div className="flex items-center gap-3">
              <Button color="primary" onClick={() => setCount((c) => c + 1)}>
                Count is {count}
              </Button>
              <Button variant="flat" onClick={() => setCount(0)}>
                Reset
              </Button>
            </div>

            <div className="space-y-2">
              <p className="text-small text-default-500">
                Backend hello response:
              </p>
              <Code className="max-w-full overflow-auto" size="sm">
                {hello ?? "(loading...)"}
              </Code>
            </div>
          </CardBody>
        </Card>
      </div>
    </Layout>
  );
}

export default App;
