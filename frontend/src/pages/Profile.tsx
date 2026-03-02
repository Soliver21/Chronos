import { useAuth } from "../context/AuthContext";
import Dashbar from "../components/dashboard/Dashbar";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Dashbar />

    
      <main className="flex-1 flex flex-col items-center w-full p-4 pt-10 pb-10">
        

        <div className="w-full max-w-6xl space-y-8">

          <div className="flex flex-col space-y-1">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              {user?.name || "Felhasználó"}
            </h1>
            <p className="text-muted-foreground">{user?.email}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Total Transactions", value: "0" },
              { label: "Reviews", value: "0" },
              { label: "Rating", value: "N/A" },
              { label: "Balance", value: "$0" },
            ].map((stat, i) => (
              <Card key={i} className="shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* TABS rendszer */}
          <Tabs defaultValue="profile" className="w-full">
            <TabsList className="w-full justify-start border-b bg-transparent p-0 h-auto space-x-6 mb-6">
              {["Profile", "Listings", "Transactions"].map((tab) => (
                <TabsTrigger 
                  key={tab}
                  value={tab.toLowerCase()} 
                  className="rounded-none border-b-2 border-transparent px-4 pb-3 pt-2 font-medium text-muted-foreground shadow-none transition-none data-[state=active]:border-primary data-[state=active]:text-foreground data-[state=active]:bg-transparent"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="profile" className="mt-0">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Edit Profile</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  
                  {/* AVATAR - KÖZÉPEN (mx-auto a flex elemen belül) */}
                  <div className="flex justify-center w-full mb-6">
                    <div className="relative">
                      <Avatar className="w-28 h-28 border-4 border-background shadow-lg">
                        <AvatarImage src="" />
                        {/* Sárga fallback, hasonló a képedhez */}
                        <AvatarFallback className="text-4xl bg-yellow-100 text-yellow-600">
                          {user?.name?.substring(0, 1).toUpperCase() || ":("}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute bottom-0 right-0 bg-primary p-2 rounded-full text-primary-foreground border-2 border-background cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>
                      </div>
                    </div>
                  </div>

                  {/* FORM INPUTOK */}
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="fullname">Full Name</Label>
                      <Input id="fullname" defaultValue={user?.name} className="max-w-full" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email (Read-only)</Label>
                      <Input id="email" value={user?.email} readOnly className="bg-muted text-muted-foreground cursor-not-allowed opacity-70" />
                    </div>
                    
                    <div className="grid gap-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea 
                        id="bio" 
                        placeholder="Tell us about yourself..." 
                        className="min-h-[120px] resize-y" 
                      />
                    </div>
                  </div>

                  <div className="pt-6 mt-4 border-t">
                    <div className="flex justify-between items-end mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground font-medium">Bizalmi szint</p>
                        <p className="text-base font-bold uppercase tracking-wide">NEWCOMER</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground font-medium">Balance</p>
                        <p className="text-base font-bold">$0</p>
                      </div>
                    </div>

                    <Button className="w-full py-6 text-base font-semibold shadow-md">
                      Adatok mentése
                    </Button>
                  </div>

                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="listings">
              <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed text-muted-foreground">
                Nincsenek még aktív hirdetéseid.......
              </div>
            </TabsContent>

            <TabsContent value="transactions">
              <div className="flex h-[200px] items-center justify-center rounded-md border border-dashed text-muted-foreground">
                Még nem történt tranzakció....
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Profile;