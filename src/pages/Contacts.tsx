import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, Send, Facebook, Twitter, Linkedin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contacts = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate form submission
    toast({
      title: "Съобщението е изпратено",
      description: "Благодарим ви за запитването. Ще се свържем с вас в най-скоро време.",
    });

    // Reset form
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: ""
    });
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Page Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">
          Контакти
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Свържете се с Фискалния съвет на България
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="text-primary" size={24} />
                Адрес
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-base mb-4">
                1000 София<br />
                ул. „Княз Дондуков" № 1<br />
                партер
              </p>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Карта</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Контактна информация</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="text-primary" size={20} />
                <div>
                  <p className="font-medium">Телефон</p>
                  <p className="text-muted-foreground">+359 2 940 7100</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Mail className="text-primary" size={20} />
                <div>
                  <p className="font-medium">Електронна поща</p>
                  <p className="text-muted-foreground">info@fiscal-council.bg</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Clock className="text-primary" size={20} />
                <div>
                  <p className="font-medium">Работно време</p>
                  <p className="text-muted-foreground">
                    Понеделник - Петък: 09:00 - 17:30
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Последвайте ни</CardTitle>
              <CardDescription>
                Останете информирани за нашата дейност
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <Button variant="outline" size="icon" asChild>
                  <a href="#" aria-label="Facebook">
                    <Facebook size={20} />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="#" aria-label="Twitter">
                    <Twitter size={20} />
                  </a>
                </Button>
                <Button variant="outline" size="icon" asChild>
                  <a href="#" aria-label="LinkedIn">
                    <Linkedin size={20} />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Изпратете ни съобщение</CardTitle>
              <CardDescription>
                Имате въпрос или предложение? Свържете се с нас.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Име *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      placeholder="Вашето име"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Електронна поща *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="subject">Тема *</Label>
                  <Select value={formData.subject} onValueChange={(value) => handleChange("subject", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Изберете тема" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">Общо запитване</SelectItem>
                      <SelectItem value="media">Медийно запитване</SelectItem>
                      <SelectItem value="academic">Академично сътрудничество</SelectItem>
                      <SelectItem value="legal">Правни въпроси</SelectItem>
                      <SelectItem value="technical">Технически проблем</SelectItem>
                      <SelectItem value="other">Друго</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="message">Съобщение *</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => handleChange("message", e.target.value)}
                    placeholder="Напишете вашето съобщение тук..."
                    rows={6}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" size="lg">
                  <Send className="mr-2" size={16} />
                  Изпрати съобщение
                </Button>

                <p className="text-sm text-muted-foreground text-center">
                  * Задължителни полета
                </p>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Информация за обработка на данни</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Вашите лични данни ще бъдат обработени в съответствие с 
                Регламент (ЕС) 2016/679 (GDPR) единствено за целите на 
                отговаряне на вашето запитване. Данните няма да бъдат 
                предоставяни на трети лица без вашето изрично съгласие.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="mt-16">
        <h2 className="text-3xl font-bold text-primary text-center mb-8">
          Често задавани въпроси
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Как мога да получа копие от доклад?</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Всички доклади и публикации са достъпни безплатно в секция 
                "Доклади" на нашия уебсайт във формат PDF.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Как да предложа тема за анализ?</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Можете да изпратите предложение чрез контактната форма, 
                като изберете тема "Общо запитване" и опишете предложението си.
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Провежда ли Фискалният съвет обучения?</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Да, организираме семинари и работни срещи. Информация за 
                предстоящи събития можете да намерите в секция "Новини".
              </CardDescription>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Как да се абонирам за новини?</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Можете да ни последвате в социалните мрежи или да посещавате 
                редовно секция "Новини" на уебсайта.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contacts;