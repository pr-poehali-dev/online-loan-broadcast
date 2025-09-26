import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [loanAmount, setLoanAmount] = useState([100000]);
  const [loanPeriod, setLoanPeriod] = useState([12]);
  const [showWidget, setShowWidget] = useState(false);
  
  const calculateMonthlyPayment = () => {
    const amount = loanAmount[0];
    const months = loanPeriod[0];
    const rate = 0.15; // 15% годовых
    const monthlyRate = rate / 12;
    
    if (monthlyRate === 0) return amount / months;
    
    const payment = amount * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                   (Math.pow(1 + monthlyRate, months) - 1);
    return payment;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalAmount = monthlyPayment * loanPeriod[0];
  const overpayment = totalAmount - loanAmount[0];

  const widgetCode = `<!-- Виджет займов для Тильды -->
<div id="loan-widget" style="max-width: 400px; margin: 20px auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; font-family: 'Open Sans', sans-serif;">
  <h3 style="color: #1e40af; font-size: 18px; font-weight: 600; margin-bottom: 16px; text-align: center;">Быстрый займ</h3>
  <div style="margin-bottom: 16px;">
    <label style="display: block; font-size: 14px; font-weight: 500; margin-bottom: 4px;">Сумма займа</label>
    <input type="range" min="10000" max="500000" value="100000" style="width: 100%; margin-bottom: 8px;" oninput="updateLoan(this.value)">
    <div style="text-align: center; font-size: 16px; font-weight: 600; color: #059669;" id="amount-display">100 000 ₽</div>
  </div>
  <div style="margin-bottom: 16px;">
    <label style="display: block; font-size: 14px; font-weight: 500; margin-bottom: 4px;">Срок займа</label>
    <select style="width: 100%; padding: 8px; border: 1px solid #e5e7eb; border-radius: 4px;" onchange="updatePeriod(this.value)">
      <option value="6">6 месяцев</option>
      <option value="12" selected>12 месяцев</option>
      <option value="18">18 месяцев</option>
      <option value="24">24 месяца</option>
    </select>
  </div>
  <div style="padding: 12px; background: #f8fafc; border-radius: 4px; margin-bottom: 16px;">
    <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
      <span style="font-size: 14px;">Ежемесячный платёж:</span>
      <span style="font-weight: 600;" id="monthly-payment">13 612 ₽</span>
    </div>
  </div>
  <button style="width: 100%; background: #1e40af; color: white; border: none; padding: 12px; border-radius: 4px; font-weight: 600; cursor: pointer;" onclick="window.open('https://your-domain.com/loan-application', '_blank')">Получить займ</button>
</div>

<script>
function updateLoan(value) {
  document.getElementById('amount-display').textContent = new Intl.NumberFormat('ru-RU').format(value) + ' ₽';
  calculatePayment();
}

function updatePeriod(period) {
  calculatePayment();
}

function calculatePayment() {
  const amount = document.querySelector('input[type="range"]').value;
  const period = document.querySelector('select').value;
  const rate = 0.15 / 12;
  const payment = amount * (rate * Math.pow(1 + rate, period)) / (Math.pow(1 + rate, period) - 1);
  document.getElementById('monthly-payment').textContent = new Intl.NumberFormat('ru-RU').format(Math.round(payment)) + ' ₽';
}
</script>`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Icon name="Building2" size={32} className="text-primary" />
              <h1 className="text-2xl font-bold text-primary">ЗаймЭкспресс</h1>
            </div>
            <nav className="hidden md:flex space-x-6">
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Главная</a>
              <a href="#calculator" className="text-gray-600 hover:text-primary transition-colors">Калькулятор</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">О нас</a>
              <a href="#" className="text-gray-600 hover:text-primary transition-colors">Контакты</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Быстрые займы
                <span className="text-primary"> с гарантией</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Получите деньги за 15 минут. Минимальные требования, 
                максимальное доверие. Более 10 лет на рынке финансовых услуг.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button size="lg" className="text-lg px-8 py-4">
                  <Icon name="CreditCard" size={20} className="mr-2" />
                  Получить займ
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                  <Icon name="Calculator" size={20} className="mr-2" />
                  Рассчитать
                </Button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">15 мин</div>
                  <div className="text-sm text-gray-600">Время одобрения</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">98%</div>
                  <div className="text-sm text-gray-600">Одобрений</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">24/7</div>
                  <div className="text-sm text-gray-600">Поддержка</div>
                </div>
              </div>
            </div>

            <div className="animate-scale-in">
              <Card className="p-6 shadow-xl bg-white/90 backdrop-blur-sm">
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl text-gray-900 flex items-center justify-center gap-2">
                    <Icon name="Shield" size={24} className="text-secondary" />
                    Безопасно и надёжно
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="UserCheck" size={20} className="text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Быстрая верификация</h3>
                      <p className="text-sm text-gray-600">Только паспорт и телефон</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                      <Icon name="Lock" size={20} className="text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Защита данных</h3>
                      <p className="text-sm text-gray-600">SSL-шифрование</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                      <Icon name="Zap" size={20} className="text-accent" />
                    </div>
                    <div>
                      <h3 className="font-semibold">Мгновенный перевод</h3>
                      <p className="text-sm text-gray-600">На карту любого банка</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section id="calculator" className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Калькулятор займа
            </h2>
            <p className="text-xl text-gray-600">
              Рассчитайте точную сумму платежей перед оформлением
            </p>
          </div>

          <Card className="p-8 shadow-xl bg-gradient-to-br from-white to-blue-50/30">
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              {/* Parameters Column */}
              <div className="lg:col-span-2 space-y-8">
                <div className="text-center lg:text-left">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center justify-center lg:justify-start gap-2">
                    <Icon name="Calculator" size={28} className="text-primary" />
                    Параметры займа
                  </h3>
                </div>

                {/* Amount Slider */}
                <div className="space-y-4">
                  <div className="text-center">
                    <Label className="text-lg font-semibold text-gray-900">
                      Сумма займа
                    </Label>
                    <div className="text-4xl font-bold text-primary mt-2">
                      {loanAmount[0].toLocaleString('ru-RU')} ₽
                    </div>
                  </div>
                  <div className="px-4">
                    <Slider
                      value={loanAmount}
                      onValueChange={setLoanAmount}
                      min={10000}
                      max={500000}
                      step={10000}
                      className="h-3 touch-pan-x"
                    />
                    <div className="flex justify-between text-sm font-medium text-gray-600 mt-3">
                      <span>10 тыс.</span>
                      <span>100 тыс.</span>
                      <span>300 тыс.</span>
                      <span>500 тыс.</span>
                    </div>
                  </div>
                </div>

                {/* Period Slider */}
                <div className="space-y-4">
                  <div className="text-center">
                    <Label className="text-lg font-semibold text-gray-900">
                      Срок займа
                    </Label>
                    <div className="text-3xl font-bold text-secondary mt-2">
                      {loanPeriod[0]} месяцев
                    </div>
                  </div>
                  <div className="px-4">
                    <Slider
                      value={loanPeriod}
                      onValueChange={setLoanPeriod}
                      min={6}
                      max={24}
                      step={6}
                      className="h-3 touch-pan-x"
                    />
                    <div className="flex justify-between text-sm font-medium text-gray-600 mt-3">
                      <span>6 мес</span>
                      <span>12 мес</span>
                      <span>18 мес</span>
                      <span>24 мес</span>
                    </div>
                  </div>
                </div>

                {/* Rate Info */}
                <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-6 rounded-xl border border-primary/20">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Icon name="Percent" size={24} className="text-primary" />
                      <span className="text-lg font-semibold text-gray-900">Процентная ставка:</span>
                    </div>
                    <Badge variant="secondary" className="text-lg px-4 py-2">15% годовых</Badge>
                  </div>
                </div>
              </div>

              {/* Results Column */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100 sticky top-8">
                  <div className="text-center mb-6">
                    <Icon name="PieChart" size={32} className="text-secondary mx-auto mb-2" />
                    <h3 className="text-xl font-bold text-gray-900">Ваш расчёт</h3>
                  </div>
                  
                  <div className="space-y-6">
                    {/* Monthly Payment - Main highlight */}
                    <div className="text-center p-4 bg-gradient-to-r from-primary/5 to-primary/10 rounded-xl border border-primary/20">
                      <div className="text-sm text-gray-600 mb-1">Ежемесячно</div>
                      <div className="text-3xl font-bold text-primary">
                        {Math.round(monthlyPayment).toLocaleString('ru-RU')} ₽
                      </div>
                    </div>
                    
                    {/* Total Amount */}
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Общая сумма:</span>
                      <span className="text-lg font-bold text-gray-900">
                        {Math.round(totalAmount).toLocaleString('ru-RU')} ₽
                      </span>
                    </div>
                    
                    {/* Overpayment */}
                    <div className="flex justify-between items-center py-3 border-b border-gray-200">
                      <span className="text-gray-600 font-medium">Переплата:</span>
                      <span className="text-lg font-bold text-accent">
                        {Math.round(overpayment).toLocaleString('ru-RU')} ₽
                      </span>
                    </div>

                    {/* Apply Button */}
                    <Button className="w-full text-lg py-6 text-white shadow-lg hover:shadow-xl transition-all duration-200" size="lg">
                      <Icon name="Send" size={20} className="mr-2" />
                      Получить {loanAmount[0].toLocaleString('ru-RU')} ₽
                    </Button>
                    
                    <div className="text-center space-y-2">
                      <p className="text-sm text-green-600 font-medium">
                        ✓ Решение за 15 минут
                      </p>
                      <p className="text-xs text-gray-500">
                        Деньги поступят на карту сразу после одобрения
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Widget Code Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Виджет для Тильды
            </h2>
            <p className="text-xl text-gray-600">
              Добавьте калькулятор займов на ваш сайт в Тильде
            </p>
          </div>

          <Card className="p-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Code" size={24} className="text-primary" />
                Код для вставки
              </CardTitle>
              <p className="text-gray-600">
                Скопируйте этот код и вставьте его в блок T123 (HTML) в редакторе Тильды
              </p>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 rounded-lg p-4 mb-4">
                <pre className="text-green-400 text-sm overflow-x-auto">
                  <code>{showWidget ? widgetCode : widgetCode.substring(0, 200) + '...'}</code>
                </pre>
              </div>
              
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setShowWidget(!showWidget)}
                  className="flex items-center gap-2"
                >
                  <Icon name={showWidget ? "EyeOff" : "Eye"} size={16} />
                  {showWidget ? "Скрыть код" : "Показать полный код"}
                </Button>
                
                <Button
                  onClick={() => {
                    navigator.clipboard.writeText(widgetCode);
                    alert('Код скопирован в буфер обмена!');
                  }}
                  className="flex items-center gap-2"
                >
                  <Icon name="Copy" size={16} />
                  Копировать код
                </Button>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Инструкция по установке:</h4>
                <ol className="text-sm text-blue-800 space-y-1">
                  <li>1. В редакторе Тильды добавьте блок T123 (HTML-код)</li>
                  <li>2. Вставьте скопированный код в поле "Код"</li>
                  <li>3. Нажмите "Сохранить и закрыть"</li>
                  <li>4. Опубликуйте страницу</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Icon name="Building2" size={24} className="text-primary" />
                <span className="text-xl font-bold">ЗаймЭкспресс</span>
              </div>
              <p className="text-gray-400">
                Надёжная финансовая компания с многолетним опытом работы на рынке займов.
              </p>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Услуги</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Быстрые займы</li>
                <li>Рефинансирование</li>
                <li>Для бизнеса</li>
                <li>Калькулятор</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Компания</h3>
              <ul className="space-y-2 text-gray-400">
                <li>О нас</li>
                <li>Лицензии</li>
                <li>Вакансии</li>
                <li>Контакты</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold mb-4">Контакты</h3>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center gap-2">
                  <Icon name="Phone" size={16} />
                  <span>8 (800) 123-45-67</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Mail" size={16} />
                  <span>info@zaimexpress.ru</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} />
                  <span>Круглосуточно</span>
                </div>
              </div>
            </div>
          </div>
          
          <Separator className="my-8 bg-gray-700" />
          
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400">
            <p>&copy; 2024 ЗаймЭкспресс. Все права защищены.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-white transition-colors">Политика конфиденциальности</a>
              <a href="#" className="hover:text-white transition-colors">Пользовательское соглашение</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;