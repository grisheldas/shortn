import React, { useEffect, useState } from "react";
import { BarLoader } from "react-spinners";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "lucide-react";
import Error from "@/components/error";
import useFetch from "@/hooks/use-fetch";
import { getUrls } from "@/db/apiUrls";
import { UrlState } from "@/context";
import { getClicksForUrls } from "@/db/apiClicks";
import LinkCard from "@/components/link-card";
import CreateLink from "@/components/create-link";

function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");

  const { user } = UrlState();

  const { data: urls, loading, error, execute: fetchUrls } = useFetch(getUrls);
  const {
    data: clicks,
    loading: loadingClicks,
    execute: fetchClicks,
  } = useFetch(getClicksForUrls);

  const filteredUrls = urls?.filter((url) =>
    url?.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    fetchUrls(user?.id);
  }, []);

  useEffect(() => {
    if (urls?.length) fetchClicks(urls?.map((url) => url.id));
  }, [urls?.length]);

  return (
    <div className="flex flex-col gap-8">
      {(loading || loadingClicks) && <BarLoader width="100%" color="#777B84" />}

      <div className="grid grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Links Created</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{urls?.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Clicks</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{clicks?.length}</p>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-between">
        <h1 className="text-3xl font-extrabold">My Links</h1>
        <CreateLink />
      </div>

      <div className="relative">
        <Input
          type="text"
          placeholder="Filter links..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Filter className="absolute top-[6px] right-2 p-1" />
      </div>
      {error && <Error message={error?.message} />}

      {(filteredUrls || []).map((url, i) => {
        return <LinkCard key={i} url={url} fetchUrls={fetchUrls} />;
      })}
    </div>
  );
}

export default Dashboard;
