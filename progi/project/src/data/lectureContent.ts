export const lectureContent: Record<string, {
  title: string;
  description: string;
  content: string;
}> = {
  intro: {
    title: 'Введение в архитектуру ЭВМ',
    description: 'Основные понятия и термины архитектуры ЭВМ. История развития вычислительной техники.',
    content: `
      <h2>Понятие архитектуры</h2>
      <p>Слово «архитектура», как и очень многое в нашей культуре, греческого происхождения, образовано из двух: αρχι — старший, главный и τέκτων — строитель. Применительно к предмету нашего изучения архитектура большинством специалистов понимается в смысле совокупности общих принципов организации аппаратных и программных средств, определяющей функциональные возможности вычислителей при решении соответствующих классов задач.</p>
      
      <h3>Число и системы счисления</h3>
      <p>Корень слова вычислитель – число. Понятие числа – тема отдельного и очень глубокого изучения. В рамках нашего курса мы ограничимся следующими определениями:</p>
      
      <blockquote>
        <p><strong>Число</strong> – одно из основных понятий математики, служащее для количественной характеристики различных предметов и явлений, как принадлежащих реальности, так и абстрактных.</p>
      </blockquote>
      
      <h4>Системы счисления</h4>
      <p><strong>Система счисления</strong> – совокупность алфавита (системы цифровых знаков) и правил их записи (цифрового синтаксиса), применяемых для их записи и чтения.</p>
      
      <p>Система счисления должна:</p>
      <ul>
        <li>Давать представления о множестве чисел</li>
        <li>Обеспечить уникальное представление каждого числа</li>
        <li>Отражать арифметическую структуру</li>
      </ul>
      
      <h4>Классификация систем счисления:</h4>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background-color: #f8f9fa;">
          <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Тип</th>
          <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Характеристика</th>
          <th style="border: 1px solid #ddd; padding: 12px; text-align: left;">Примеры</th>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 12px;">Позиционные</td>
          <td style="border: 1px solid #ddd; padding: 12px;">Значение цифры определяется её разрядом (позицией в записи числа)</td>
          <td style="border: 1px solid #ddd; padding: 12px;">Двоичная, восьмеричная, десятичная, шестнадцатеричная</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 12px;">Непозиционные</td>
          <td style="border: 1px solid #ddd; padding: 12px;">Значение цифры не зависит от её позиции в нотации</td>
          <td style="border: 1px solid #ddd; padding: 12px;">Римская, египетская, славянская</td>
        </tr>
      </table>
      
      <h3>Понятие информации</h3>
      <p>В настоящее время компьютеры рассматриваются, прежде всего, как важнейшие элементы систем обработки информации. Поэтому необходимо рассмотреть понятия информации и связи этого понятия с вычислениями.</p>
      
      <h4>Определения информации:</h4>
      <blockquote>
        <p><strong>По Кастлеру:</strong> информация есть запомненный выбор одного варианта из нескольких возможных и равноправных.</p>
        <p><strong>По Мелик-Гайказян:</strong> информация есть многостадийный, необратимый процесс становления структуры в открытой неравновесной системе.</p>
      </blockquote>
      
      <h4>Количественные оценки информации:</h4>
      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p><strong>Формула Хартли:</strong></p>
        <p style="text-align: center; font-size: 1.2em; margin: 10px 0;"><code>I = log₂N</code></p>
        <p>где N — количество равновероятных сообщений</p>
        
        <p><strong>Формула Шеннона:</strong></p>
        <p style="text-align: center; font-size: 1.2em; margin: 10px 0;"><code>H = -Σ(pᵢ·log₂pᵢ)</code></p>
        <p>где pᵢ — вероятность i-го сообщения</p>
      </div>
    `
  },
  'analog-digital': {
    title: 'Аналоговые и цифровые вычислительные системы',
    description: 'Принципы, эволюция и современные тенденции аналоговых и цифровых вычислителей.',
    content: `
      <h2>Историческая перспектива</h2>
      <p>Аналоговые вычислительные устройства имеют более древнюю историю. Еще в античности использовались механические аналоговые устройства, такие как антикитерский механизм (I век до н.э.) для астрономических расчетов.</p>
      
      <p>Первые электронные аналоговые компьютеры появились в 1920-х годах и широко использовались для решения дифференциальных уравнений в реальном времени. Пик их развития пришелся на 1950-60-е годы.</p>
      
      <h3>Принципиальные различия архитектур</h3>
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
        <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px;">
          <h4>Аналоговые системы</h4>
          <ul>
            <li><strong>Физическая аналогия:</strong> Используют непрерывные физические величины (напряжение, ток)</li>
            <li><strong>Параллелизм:</strong> Все компоненты работают одновременно</li>
            <li><strong>Точность:</strong> Ограничена физическими параметрами компонентов</li>
            <li><strong>Программирование:</strong> Требует физического изменения структуры</li>
          </ul>
        </div>
        
        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px;">
          <h4>Цифровые системы</h4>
          <ul>
            <li><strong>Символьное представление:</strong> Используют дискретные значения (биты, байты)</li>
            <li><strong>Последовательная обработка:</strong> Работают по тактам</li>
            <li><strong>Точность:</strong> Определяется разрядностью</li>
            <li><strong>Гибкость:</strong> Одна аппаратура может выполнять разные задачи</li>
          </ul>
        </div>
      </div>
      
      <h3>Современные гибридные системы</h3>
      <p>В последние десятилетия наблюдается возрождение интереса к аналоговым методам в сочетании с цифровыми технологиями. Современные гибридные системы используют преимущества обоих подходов:</p>
      
      <div style="background-color: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h4>Нейроморфные процессоры</h4>
        <p>Имитируют работу биологических нейронов, сочетая аналоговые принципы обработки сигналов с цифровым управлением. Компании как Intel (Loihi) и IBM (TrueNorth) разрабатывают такие чипы для задач искусственного интеллекта.</p>
      </div>
      
      <h3>Теоретические основы: от Котельникова к современности</h3>
      <p>Теорема Котельникова (1933 г.) установила фундаментальные пределы дискретизации непрерывных сигналов. Ее современные интерпретации учитывают:</p>
      
      <ul>
        <li>Неидеальность реальных АЦП/ЦАП</li>
        <li>Ограничения по скорости обработки</li>
        <li>Проблемы квантования и шумов</li>
        <li>Компромиссы между точностью и вычислительной сложностью</li>
      </ul>
      
      <h3>Перспективные направления</h3>
      <p>Будущее вычислительных систем связано с развитием гибридных архитектур:</p>
      
      <ol>
        <li><strong>Оптические нейроморфные компьютеры:</strong> Сочетание аналоговой оптической обработки с цифровым управлением</li>
        <li><strong>Мемристорные системы:</strong> Использование элементов с памятью сопротивления</li>
        <li><strong>Биологические компьютеры:</strong> Использование ДНК и других биологических молекул</li>
        <li><strong>Квантово-классические гибриды:</strong> Интеграция квантовых процессоров с цифровыми системами</li>
      </ol>
    `
  },
  hierarchy: {
    title: 'Иерархическая организация цифрового компьютера',
    description: 'От транзисторов до языков высокого уровня - многоуровневая организация современных компьютеров.',
    content: `
      <h2>Основные определения и концепции</h2>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 20px; margin: 20px 0;">
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
          <h4>Цифровой компьютер</h4>
          <p>Автоматическое устройство для обработки информации, выполняющее заданные программы путем последовательного выполнения машинных команд. Современные компьютеры основаны на архитектуре фон Неймана.</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
          <h4>Алгоритм</h4>
          <p>Точное конечное предписание, определяющее последовательность действий для решения задачи. Алгоритмы должны обладать свойствами: детерминированности, массовости, результативности и конечности.</p>
        </div>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px;">
          <h4>Программа</h4>
          <p>Последовательность команд, описывающая решение задачи на формальном языке. Программы преобразуются в машинный код через процессы компиляции или интерпретации.</p>
        </div>
      </div>
      
      <h3>Принципы многоуровневой организации</h3>
      <p>Современные компьютеры представляют собой сложные многоуровневые системы, где каждый уровень абстракции обеспечивает:</p>
      <ul>
        <li><strong>Инкапсуляцию сложности</strong> - скрытие деталей реализации нижележащих уровней</li>
        <li><strong>Стандартизированные интерфейсы</strong> - четкие правила взаимодействия между уровнями</li>
        <li><strong>Независимость реализации</strong> - возможность различных технических решений</li>
        <li><strong>Иерархическую специализацию</strong> - разделение ответственности между уровнями</li>
      </ul>
      
      <h3>Методы преобразования между уровнями абстракции</h3>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <caption style="font-weight: bold; margin-bottom: 10px;">Сравнительный анализ трансляции и интерпретации</caption>
        <thead>
          <tr style="background-color: #f8f9fa;">
            <th style="border: 1px solid #ddd; padding: 12px;">Характеристика</th>
            <th style="border: 1px solid #ddd; padding: 12px;">Трансляция</th>
            <th style="border: 1px solid #ddd; padding: 12px;">Интерпретация</th>
            <th style="border: 1px solid #ddd; padding: 12px;">JIT-компиляция</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Принцип работы</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Полное преобразование в машинный код</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Последовательное выполнение исходного кода</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Динамическая компиляция "на лету"</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Оптимизация</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Глубокая статическая</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Минимальная</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Динамическая на основе профилирования</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Примеры</td>
            <td style="border: 1px solid #ddd; padding: 12px;">GCC, LLVM, MSVC</td>
            <td style="border: 1px solid #ddd; padding: 12px;">CPython, оригинальный JavaScript</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Java HotSpot, V8 JavaScript engine</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Детальный анализ уровней компьютерной иерархии</h3>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <caption style="font-weight: bold; margin-bottom: 10px;">Характеристики уровней компьютерной иерархии</caption>
        <thead>
          <tr style="background-color: #f8f9fa;">
            <th style="border: 1px solid #ddd; padding: 12px;">Уровень</th>
            <th style="border: 1px solid #ddd; padding: 12px;">Абстракция</th>
            <th style="border: 1px solid #ddd; padding: 12px;">Язык/Интерфейс</th>
            <th style="border: 1px solid #ddd; padding: 12px;">Временные характеристики</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">5 - Прикладной</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Предметная область</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Python, Java, C#</td>
            <td style="border: 1px solid #ddd; padding: 12px;">мс-с</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">4 - Ассемблерный</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Машинно-зависимый код</td>
            <td style="border: 1px solid #ddd; padding: 12px;">ASM, макросы</td>
            <td style="border: 1px solid #ddd; padding: 12px;">нс-мкс</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">3 - Системный</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Ресурсы компьютера</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Системные вызовы, API ОС</td>
            <td style="border: 1px solid #ddd; padding: 12px;">мкс-мс</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">2 - Микрокод</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Микроархитектура</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Микрокоманды</td>
            <td style="border: 1px solid #ddd; padding: 12px;">нс</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">1 - Логический</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Цифровые схемы</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Логические уравнения</td>
            <td style="border: 1px solid #ddd; padding: 12px;">пс-нс</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">0 - Физический</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Электронные компоненты</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Схемотехника</td>
            <td style="border: 1px solid #ddd; padding: 12px;">пс</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Современные тенденции в компьютерных архитектурах</h3>
      
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 20px; margin: 20px 0;">
        <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px;">
          <h4>Гетерогенные вычисления</h4>
          <p>Сочетание различных типов процессоров (CPU+GPU+TPU) в одной системе. Примеры: Apple M1, AMD APU, NVIDIA DGX.</p>
        </div>
        <div style="background-color: #f3e5f5; padding: 20px; border-radius: 8px;">
          <h4>Квантовые компьютеры</h4>
          <p>Использование квантовых битов (кубитов) для параллельных вычислений. Технологии: сверхпроводящие кубиты, ионные ловушки.</p>
        </div>
        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px;">
          <h4>Нейроморфные чипы</h4>
          <p>Аппаратная имитация нейронных сетей. Проекты: IBM TrueNorth, Intel Loihi, нейросинаптические процессоры.</p>
        </div>
      </div>
    `
  },
  'architecture-organization': {
    title: 'Архитектура и организация компьютера',
    description: 'Принципы и эволюция компьютерных архитектур - от концепции до реализации.',
    content: `
      <h2>Основные концепции архитектуры компьютера</h2>
      
      
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
        <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px;">
          <h4>Архитектура компьютера</h4>
          <p>Совокупность характеристик вычислительной системы, существенных для программиста. Включает систему команд, форматы данных, методы адресации и организацию памяти. Термин впервые использован IBM в 1960-х при разработке System/360.</p>
        </div>
        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px;">
          <h4>Организация компьютера</h4>
          <p>Конкретные аппаратные механизмы реализации архитектуры. Включает схемы управления, интерфейсы и технологические решения. Например, одна архитектура x86 может быть реализована разными организационными подходами в процессорах Intel и AMD.</p>
        </div>
      </div>
      
      <h3>Ключевые различия архитектуры и организации</h3>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <caption style="font-weight: bold; margin-bottom: 10px;">Сравнение архитектуры и организации компьютера</caption>
        <thead>
          <tr style="background-color: #f8f9fa;">
            <th style="border: 1px solid #ddd; padding: 12px;">Аспект</th>
            <th style="border: 1px solid #ddd; padding: 12px;">Архитектура</th>
            <th style="border: 1px solid #ddd; padding: 12px;">Организация</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Уровень абстракции</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Логический (что делает)</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Физический (как реализовано)</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Видимость</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Программисту</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Скрыта от программиста</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Примеры</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Набор команд, режимы адресации</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Схемы управления, интерфейсы</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Изменяемость</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Стабильна в семействе процессоров</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Меняется между поколениями</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Основные компоненты компьютерной системы</h3>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <caption style="font-weight: bold; margin-bottom: 10px;">Функциональные компоненты компьютера</caption>
        <thead>
          <tr style="background-color: #f8f9fa;">
            <th style="border: 1px solid #ddd; padding: 12px;">Компонент</th>
            <th style="border: 1px solid #ddd; padding: 12px;">Функция</th>
            <th style="border: 1px solid #ddd; padding: 12px;">Архитектурные аспекты</th>
            <th style="border: 1px solid #ddd; padding: 12px;">Организационные аспекты</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Центральный процессор (CPU)</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Выполнение команд</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Набор команд, регистры</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Конвейер, кэш, предсказание ветвлений</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Память</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Хранение данных и программ</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Адресное пространство, сегментация</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Иерархия памяти, технологии DRAM/SSD</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Устройства ввода/вывода</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Взаимодействие с внешним миром</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Порты, прерывания</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Контроллеры, DMA, шинные протоколы</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Системная шина</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Связь компонентов</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Адрес/данные/управление</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Пропускная способность, арбитраж</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Классические компьютерные архитектуры</h3>
      
      <div style="background-color: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h4>Гарвардская архитектура</h4>
        <p>Разработана Говардом Эйкеном в 1944 году (компьютер "Марк I"). Основные характеристики:</p>
        <ul>
          <li>Раздельные физические устройства для хранения команд и данных</li>
          <li>Различные форматы представления команд и данных</li>
          <li>Параллельный доступ к командам и данным</li>
        </ul>
        
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f9fa;">Преимущества</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f9fa;">Недостатки</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f9fa;">Применение</th>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Высокая надежность</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Сложность реализации</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Микроконтроллеры</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Параллелизм обработки</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Ограниченная гибкость</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Сигнальные процессоры</td>
          </tr>
        </table>
      </div>
      
      <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h4>Принстонская (фон Неймановская) архитектура</h4>
        <p>Предложена Джоном фон Нейманом в 1945 году. Основные принципы:</p>
        <ul>
          <li>Единая память для команд и данных</li>
          <li>Последовательное выполнение команд</li>
          <li>Двоичное представление информации</li>
        </ul>
        
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <tr>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f9fa;">Преимущества</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f9fa;">Недостатки</th>
            <th style="border: 1px solid #ddd; padding: 8px; background-color: #f8f9fa;">Применение</th>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Простота программирования</td>
            <td style="border: 1px solid #ddd; padding: 8px;">"Узкое горлышко" памяти</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Универсальные компьютеры</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Гибкость</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Уязвимость к ошибкам</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Серверы, ПК</td>
          </tr>
        </table>
      </div>
      
      <h3>Современные гибридные подходы</h3>
      <p>Современные процессоры сочетают принципы обеих архитектур:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background-color: #f8f9fa;">
          <th style="border: 1px solid #ddd; padding: 12px;">Уровень</th>
          <th style="border: 1px solid #ddd; padding: 12px;">Архитектура</th>
          <th style="border: 1px solid #ddd; padding: 12px;">Пример реализации</th>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 12px;">Кэш L1</td>
          <td style="border: 1px solid #ddd; padding: 12px;">Гарвардская</td>
          <td style="border: 1px solid #ddd; padding: 12px;">Раздельные кэши команд и данных</td>
        </tr>
        <tr>
          <td style="border: 1px solid #ddd; padding: 12px;">Основная память</td>
          <td style="border: 1px solid #ddd; padding: 12px;">Фон Неймановская</td>
          <td style="border: 1px solid #ddd; padding: 12px;">Единое адресное пространство</td>
        </tr>
      </table>
    `
  },
  'digital-elements': {
    title: 'Элементы и узлы цифрового компьютера',
    description: 'Логические элементы, регистры, счетчики и принципы построения цифровых устройств.',
    content: `
      <h2>Исторические основы цифровой логики</h2>
      <p>Логика как наука о рассуждениях (от греч. λογος - рассуждение) зародилась в Древней Греции. Аристотель разработал первую формальную систему логики, которая оставалась практически неизменной до середины XIX века, когда Джордж Буль создал алгебру логики (булеву алгебру).</p>
      
      <div style="background-color: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h4>Эволюция логических систем:</h4>
        <ul>
          <li><strong>IV в. до н.э.:</strong> Аристотелева логика - первая формальная система</li>
          <li><strong>1847 г.:</strong> Булева алгебра - математическая формализация логики</li>
          <li><strong>Нач. XX в.:</strong> Многозначные логики (Я. Лукасевич, Э. Пост)</li>
          <li><strong>1965 г.:</strong> Теория нечетких множеств Лотфи Заде</li>
        </ul>
      </div>
      
      <h3>Булева алгебра и базовые логические элементы</h3>
      <p>В булевой алгебре операнды и результаты операций принимают только два значения: 0 (ложь) и 1 (истина). Основные операции:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <caption style="font-weight: bold; margin-bottom: 10px;">Основные логические операции</caption>
        <thead>
          <tr style="background-color: #f8f9fa;">
            <th style="border: 1px solid #ddd; padding: 12px;">Операция</th>
            <th style="border: 1px solid #ddd; padding: 12px;">Обозначение</th>
            <th style="border: 1px solid #ddd; padding: 12px;">Описание</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Отрицание (НЕ)</td>
            <td style="border: 1px solid #ddd; padding: 12px;">¬, N, ‾</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Инверсия входного сигнала</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Конъюнкция (И)</td>
            <td style="border: 1px solid #ddd; padding: 12px;">˄</td>
            <td style="border: 1px solid #ddd; padding: 12px;">1 только если все входы 1</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Дизъюнкция (ИЛИ)</td>
            <td style="border: 1px solid #ddd; padding: 12px;">˅</td>
            <td style="border: 1px solid #ddd; padding: 12px;">1 если хотя бы один вход 1</td>
          </tr>
        </tbody>
      </table>
      
      <h4>Таблицы истинности базовых операций</h4>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 20px; margin: 20px 0;">
        <div>
          <table style="width: 100%; border-collapse: collapse;">
            <caption style="font-weight: bold;">НЕ (¬A)</caption>
            <tr style="background-color: #f8f9fa;">
              <th style="border: 1px solid #ddd; padding: 8px;">A</th>
              <th style="border: 1px solid #ddd; padding: 8px;">¬A</th>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">0</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">1</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">1</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">0</td>
            </tr>
          </table>
        </div>
        
        <div>
          <table style="width: 100%; border-collapse: collapse;">
            <caption style="font-weight: bold;">И (A˄B)</caption>
            <tr style="background-color: #f8f9fa;">
              <th style="border: 1px solid #ddd; padding: 8px;">A</th>
              <th style="border: 1px solid #ddd; padding: 8px;">B</th>
              <th style="border: 1px solid #ddd; padding: 8px;">A˄B</th>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">0</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">0</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">0</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">0</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">1</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">0</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">1</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">0</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">0</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">1</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">1</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">1</td>
            </tr>
          </table>
        </div>
        
        <div>
          <table style="width: 100%; border-collapse: collapse;">
            <caption style="font-weight: bold;">ИЛИ (A˅B)</caption>
            <tr style="background-color: #f8f9fa;">
              <th style="border: 1px solid #ddd; padding: 8px;">A</th>
              <th style="border: 1px solid #ddd; padding: 8px;">B</th>
              <th style="border: 1px solid #ddd; padding: 8px;">A˅B</th>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">0</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">0</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">0</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">0</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">1</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">1</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">1</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">0</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">1</td>
            </tr>
            <tr>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">1</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">1</td>
              <td style="border: 1px solid #ddd; padding: 8px; text-align: center;">1</td>
            </tr>
          </table>
        </div>
      </div>
      
      <h3>Комбинационные и последовательностные схемы</h3>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">
        <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px;">
          <h4>Комбинационные схемы</h4>
          <p>Выход зависит только от текущего состояния входов:</p>
          <ul>
            <li><strong>Дешифраторы:</strong> Преобразуют n-разрядный код в сигнал на одной из 2ⁿ выходных линий</li>
            <li><strong>Мультиплексоры:</strong> Выбирают один из нескольких входных сигналов</li>
            <li><strong>Шифраторы:</strong> Преобразуют унитарный код в двоичный</li>
            <li><strong>Сумматоры:</strong> Выполняют арифметическое сложение</li>
          </ul>
        </div>
        
        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px;">
          <h4>Последовательностные схемы</h4>
          <p>Выход зависит от текущих входов и предыдущего состояния:</p>
          <ul>
            <li><strong>Триггеры:</strong> Базовые элементы памяти (1 бит)</li>
            <li><strong>Регистры:</strong> Набор триггеров для хранения слова</li>
            <li><strong>Счетчики:</strong> Подсчет количества входных импульсов</li>
          </ul>
        </div>
      </div>
      
      <h3>Триггеры - базовые элементы памяти</h3>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <caption style="font-weight: bold; margin-bottom: 10px;">Основные типы триггеров</caption>
        <thead>
          <tr style="background-color: #f8f9fa;">
            <th style="border: 1px solid #ddd; padding: 12px;">Тип</th>
            <th style="border: 1px solid #ddd; padding: 12px;">Описание</th>
            <th style="border: 1px solid #ddd; padding: 12px;">Таблица истинности</th>
            <th style="border: 1px solid #ddd; padding: 12px;">Применение</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">RS-триггер</td>
            <td style="border: 1px solid #ddd; padding: 12px;">С раздельной установкой 0 (Reset) и 1 (Set)</td>
            <td style="border: 1px solid #ddd; padding: 12px; font-family: monospace;">
              S R | Q<br>
              0 0 | Q₀<br>
              0 1 | 0<br>
              1 0 | 1<br>
              1 1 | -
            </td>
            <td style="border: 1px solid #ddd; padding: 12px;">Базовый элемент, простейшая память</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">D-триггер</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Задержка (Delay) - запоминает входное значение</td>
            <td style="border: 1px solid #ddd; padding: 12px; font-family: monospace;">
              D C | Q<br>
              x 0 | Q₀<br>
              0 ↑ | 0<br>
              1 ↑ | 1
            </td>
            <td style="border: 1px solid #ddd; padding: 12px;">Регистры, буферы</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">JK-триггер</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Универсальный (Jump-Kill)</td>
            <td style="border: 1px solid #ddd; padding: 12px; font-family: monospace;">
              J K C | Q<br>
              0 0 ↑ | Q₀<br>
              0 1 ↑ | 0<br>
              1 0 ↑ | 1<br>
              1 1 ↑ | ¬Q₀
            </td>
            <td style="border: 1px solid #ddd; padding: 12px;">Счетчики, сложные схемы</td>
          </tr>
        </tbody>
      </table>
      
      <h3>Сложные цифровые узлы</h3>
      
      <div style="background-color: #fff3e0; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h4>Регистры</h4>
        <p>Последовательность триггеров для хранения многоразрядных данных:</p>
        
        <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
          <tr style="background-color: #f8f9fa;">
            <th style="border: 1px solid #ddd; padding: 8px;">Тип</th>
            <th style="border: 1px solid #ddd; padding: 8px;">Описание</th>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Параллельный</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Одновременная запись/чтение всех разрядов</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">Сдвиговый</td>
            <td style="border: 1px solid #ddd; padding: 8px;">Последовательная запись с побитовым сдвигом</td>
          </tr>
        </table>
      </div>
      
      <div style="background-color: #f3e5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h4>Преобразователи кодов</h4>
        <p>Устройства для перевода между разными системами кодирования:</p>
        <ul>
          <li><strong>Шифраторы:</strong> Унитарный код → двоичный (напр., клавиатурные)</li>
          <li><strong>Дешифраторы:</strong> Двоичный код → унитарный (напр., управление индикаторами)</li>
          <li><strong>Преобразователи:</strong> BCD → 7-сегментный код для дисплеев</li>
        </ul>
      </div>
    `
  },
  cpu: {
    title: 'Центральный процессор',
    description: 'Архитектура CPU, принципы конвейеризации команд, параллелизм на уровне инструкций.',
    content: `
      <h2>Программная модель (регистровая структура) процессора</h2>
      <p>Под регистровой структурой процессора понимается набор программно доступных регистров. Поэтому часто используется термин «программная модель процессора». Программная доступность регистров означает, что со стороны программы, т.е. с использованием некоторых машинных команд, может осуществляться обращение к этим регистрам – как по чтению, так и по записи.</p>
      
      <h4>Регистровая память включает:</h4>
      <ul>
        <li><strong>Программно доступные регистры:</strong>
          <ul>
            <li>Прикладные</li>
            <li>Системные (CR, GDTR, LDTR, IDTR, TR, DR, GPR)</li>
          </ul>
        </li>
        <li><strong>Программно недоступные регистры</strong> (например, регистр команд)</li>
      </ul>

      <h4>Системные регистры:</h4>
      <ul>
        <li><strong>Управляющие регистры (CR)</strong></li>
        <li><strong>Регистры управления памятью:</strong>
          <ul>
            <li>GDTR - Global Descriptor Table Register</li>
            <li>LDTR - Local Descriptor Table Register</li>
            <li>IDTR - Interrupt Descriptor Table Register</li>
            <li>TR - Task Register</li>
          </ul>
        </li>
        <li><strong>Регистры отладки (DR)</strong></li>
        <li><strong>Регистры проверки (TR)</strong></li>
        <li><strong>Универсальные регистры (GPR)</strong></li>
      </ul>

      <h3>Центральный процессор (тракт данных)</h3>
      <p>Основные компоненты центрального процессора:</p>
      <ul>
        <li>Устройство управления (выборка, декодирование и выполнение команд)</li>
        <li>Регистры (временное хранение операндов и состояний)</li>
        <li>АЛУ (арифметико-логическое устройство)</li>
        <li>Шины передачи данных</li>
      </ul>
      
      <p>Регистровая память – внутренняя память процессора, предназначенная для хранения операндов, адресов и результатов операций.</p>
      
      <h4>Цикл выполнения команд:</h4>
      <ol>
        <li>Вызов команды из памяти в регистр команд</li>
        <li>Изменение указателя инструкций (IP)</li>
        <li>Определение типа команды</li>
        <li>При необходимости - определение адреса слова в памяти</li>
        <li>Перенос слова из памяти в регистр ЦП</li>
        <li>Выполнение команды</li>
        <li>Переход к следующей команде</li>
      </ol>
      
      <p>Регистр IP (Instruction Pointer) или РС (Program Counter). Термин «программный счетчик» PC неудачен, так как на самом деле этот регистр ничего не считает, а указывает какая команда должна выполняться следующей. Поэтому лучше использовать термин «указатель инструкций» и аббревиатуру IP.</p>
      
      <h3>RISC и CISC архитектуры</h3>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background-color: #f8f9fa;">
            <th style="border: 1px solid #ddd; padding: 12px;">CISC</th>
            <th style="border: 1px solid #ddd; padding: 12px;">RISC</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Комплексные команды</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Упрощенные команды</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Выполнение через микрокод</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Прямое аппаратное выполнение</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Меньшее количество регистров</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Большое количество регистров</td>
          </tr>
        </tbody>
      </table>

      <h3>Методы обеспечения параллелизма</h3>
      <ul>
        <li><strong>Конвейеризация:</strong> Разделение выполнения команды на этапы</li>
        <li><strong>Суперскалярность:</strong> Несколько исполнительных устройств</li>
        <li><strong>Многоядерность:</strong> Несколько процессоров на одном кристалле</li>
      </ul>
      
      <h3>Структура и форматы машинных команд</h3>
      <p>Основные форматы команд:</p>
      <ul>
        <li>Четырехадресные</li>
        <li>Трехадресные</li>
        <li>Двухадресные</li>
        <li>Одноадресные</li>
        <li>Безадресные (стековые)</li>
      </ul>

      <h3>Структура процессора и выполнение команд</h3>
      <p>Основные компоненты:</p>
      <ul>
        <li>Регистр адреса (РА)</li>
        <li>Указатель стека (УкС)</li>
        <li>Счетчик команд (СК)</li>
        <li>Регистр команд (РК)</li>
        <li>Регистры общего назначения (РОН)</li>
        <li>Индексные регистры (ИР)</li>
        <li>Регистр признаков (РПР)</li>
        <li>Буферы данных и адреса</li>
        <li>Аккумулятор</li>
      </ul>
    `
  },
  memory: {
    title: 'Запоминающие устройства',
    description: 'Иерархия памяти, работа кэшей, виртуальная память и методы оптимизации доступа.',
    content: `
      <h2>Иерархия компьютерной памяти</h2>
      
      <p>Современные компьютерные системы используют сложную иерархию запоминающих устройств, где каждый уровень компенсирует недостатки предыдущего. В основе этой пирамиды находятся регистры процессора, обеспечивающие доступ к данным за 1 наносекунду благодаря непосредственной интеграции в вычислительные ядра. Однако их объем крайне ограничен - всего 1-4 килобайта на ядро.</p>

      <p>На следующем уровне располагается кэш-память L1 и L2, построенная на быстродействующих SRAM-ячейках. Типичная задержка доступа составляет 0.5-5 наносекунд при емкости от 32 до 512 килобайт на ядро. Кэш третьего уровня (L3) уже является общим для нескольких ядер и может достигать нескольких мегабайт, но при этом увеличивает задержку до 10-20 наносекунд.</p>

      <p>Оперативная память (DRAM) представляет собой следующий критически важный уровень иерархии. Современные модули DDR5 обеспечивают пропускную способность до 51.2 ГБ/с при латентности около 14 наносекунд. Основное преимущество ОЗУ - баланс между скоростью работы и стоимостью хранения данных, что делает ее идеальной для временного хранения активно используемой информации.</p>

      <h3>Эволюция технологий памяти</h3>
      
      <p>Развитие оперативной памяти прошло значительный путь от первых модулей SDRAM до современных стандартов DDR5 и LPDDR5X. Переход на DDR5 в 2020 году принес несколько ключевых улучшений: скорость передачи данных увеличилась до 6.4 гигатрансферов в секунду, было реализовано разделение каналов на два независимых 32-битных потока, а также внедрена система коррекции ошибок непосредственно на кристалле памяти.</p>

      <p>Параллельно развивались технологии энергоэффективной памяти LPDDR, особенно востребованные в мобильных устройствах. LPDDR5X, представленный в 2022 году, достиг скорости 8533 Мбит/с на линию при напряжении всего 1.05 вольта. Это стало возможным благодаря применению 10-нанометрового техпроцесса и усовершенствованным схемам динамического управления питанием (DVFS).</p>

      <h3>Накопители информации</h3>
      
      <p>Постоянные запоминающие устройства претерпели революционные изменения за последнее десятилетие. Твердотельные накопители на основе 3D NAND Flash памяти с 232 слоями (по состоянию на 2023 год) обеспечивают емкость до 16 терабайт в потребительских решениях. Использование QLC-технологии (4 бита на ячейку) позволило значительно снизить стоимость хранения, хотя и ценой уменьшения ресурса перезаписи.</p>

      <p>Интерфейсы подключения накопителей также не стояли на месте. Если SATA III ограничивал скорость передачи данных 600 МБ/с, то современные NVMe-устройства через PCIe 5.0 x4 достигают 16 ГБ/с. Это стало возможным благодаря переходу от параллельного к последовательному интерфейсу и увеличению тактовой частоты до 32 ГТ/с в PCIe 5.0 стандарте.</p>

      <h3>Принципы оптимизации доступа</h3>
      
      <p>Эффективное использование иерархии памяти требует глубокого понимания принципов локальности данных. Процессоры реализуют сложные алгоритмы предвыборки (prefetching), которые анализируют шаблоны доступа к памяти и заранее загружают потенциально востребованные данные в кэш. Современные системы используют как аппаратные префетчеры, так и программные инструкции prefetch, встроенные компиляторами.</p>

      <p>Другим важным аспектом является политика замещения кэш-линий. В отличие от простых алгоритмов вроде LRU (Least Recently Used), современные процессоры применяют адаптивные схемы типа RRIP (Re-Reference Interval Prediction), которые лучше справляются с нерегулярными шаблонами доступа. Эти механизмы особенно критичны в многопоточных сценариях, когда несколько ядер конкурируют за ограниченный кэш.</p>

      <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p>Пример оптимизации доступа к памяти демонстрирует, как простая переработка алгоритма может дать десятикратный прирост производительности:</p>
        <pre style="background-color: #f1f1f1; padding: 15px; border-radius: 5px; overflow-x: auto;">
// Неоптимизированный код со случайным доступом
for(int i = 0; i < N; i++) {
    sum += data[random_index[i]];
}

// Оптимизированная версия с последовательным доступом
for(int i = 0; i < N; i++) {
    sum += data[i];
}</pre>
        <p>Во втором случае процессор может эффективно использовать предвыборку данных и загружать их большими блоками, минимизируя количество обращений к основной памяти.</p>
      </div>
    `
  },
  'computing-systems': {
    title: 'Вычислительные системы',
    description: 'Многопроцессорные системы, кластеры, распределенные вычисления и современные архитектуры.',
    content: `
      <p>Современные вычислительные системы представляют собой сложные архитектурные решения, разработанные для эффективного решения различных классов задач. Эволюция компьютерных архитектур привела к появлению множества специализированных подходов к организации параллельных вычислений.</p>

      <h3>Современные классификации вычислительных систем</h3>
      <p>Традиционная таксономия Флинна (SISD, SIMD, MISD, MIMD) в последние годы дополнена новыми классами архитектур. Особый интерес представляет класс MSIMD - сильносвязанные комплексы, сочетающие преимущества MIMD-архитектур с векторными или SIMD-процессорами. Такая гибридизация позволяет оптимально распределять вычислительную нагрузку между различными типами параллелизма.</p>

      <h3>Архитектуры с общей памятью</h3>
      <p>Мультипроцессорные системы с общей памятью (UMA) обеспечивают равноправный доступ всех процессоров к единому адресному пространству. Однако с ростом числа процессоров возникает проблема когерентности кэшей, когда разные процессоры могут иметь несогласованные копии одних и тех же данных. Решением становится сложная аппаратная поддержка инвалидации кэш-линий при модификации общих переменных.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background-color: #f8f9fa;">
            <th style="border: 1px solid #ddd; padding: 12px;">Топология</th>
            <th style="border: 1px solid #ddd; padding: 12px;">Диаметр</th>
            <th style="border: 1px solid #ddd; padding: 12px;">Связность</th>
            <th style="border: 1px solid #ddd; padding: 12px;">Стоимость реализации</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Полный граф</td>
            <td style="border: 1px solid #ddd; padding: 12px;">1</td>
            <td style="border: 1px solid #ddd; padding: 12px;">N(N-1)/2</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Очень высокая</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Тор (3D решетка)</td>
            <td style="border: 1px solid #ddd; padding: 12px;">O(n<sup>1/3</sup>)</td>
            <td style="border: 1px solid #ddd; padding: 12px;">6</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Средняя</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Дерево</td>
            <td style="border: 1px solid #ddd; padding: 12px;">O(log N)</td>
            <td style="border: 1px solid #ddd; padding: 12px;">1</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Низкая</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Гиперкуб</td>
            <td style="border: 1px solid #ddd; padding: 12px;">log<sub>2</sub>N</td>
            <td style="border: 1px solid #ddd; padding: 12px;">log<sub>2</sub>N</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Высокая</td>
          </tr>
        </tbody>
      </table>
      
      <p>Архитектуры NUMA (Non-Uniform Memory Access) предлагают альтернативный подход с физическим разделением памяти. В таких системах выделяют несколько подклассов:</p>
      <ul>
        <li>NCC-NUMA (без поддержки когерентности кэшей)</li>
        <li>CC-NUMA (с когерентными кэшами)</li>
        <li>COMA (архитектура только с кэш-памятью)</li>
      </ul>

      <h3>Системы с распределенной памятью</h3>
      <p>Мультикомпьютеры (NORMA) полностью отказываются от общей памяти в пользу явного обмена сообщениями между узлами. Этот класс включает:</p>
      <ul>
        <li>MPP (массивно-параллельные системы)</li>
        <li>Кластерные решения на основе стандартных серверов</li>
      </ul>

      <p>Основное преимущество таких систем - отсутствие проблем когерентности и практически неограниченная масштабируемость. Однако сложность программирования и высокие накладные расходы на коммуникацию остаются серьезными вызовами.</p>

      <h3>Кластерные технологии</h3>
      <p>Современные кластеры можно классифицировать по назначению:</p>
      <ul>
        <li>Высокодоступные системы (HA) с избыточностью компонентов</li>
        <li>Кластеры балансировки нагрузки</li>
        <li>Высокопроизводительные вычислительные системы (HPC)</li>
        <li>Grid-системы с динамически изменяемой конфигурацией</li>
      </ul>

      <p>Ключевое преимущество кластеров - оптимальное соотношение цены и производительности. Однако их эффективность часто ограничивается пропускной способностью межсоединений. Современные решения, такие как InfiniBand, позволяют существенно снизить коммуникационные задержки за счет вывода контроллеров памяти за пределы традиционной шинной архитектуры.</p>

      <h3>Топологии коммуникационных сетей</h3>
      <p>Эффективность распределенных систем во многом определяется организацией межпроцессорных соединений. Основные топологии включают:</p>
      <ul>
        <li>Линейные массивы и кольца для конвейерных вычислений</li>
        <li>Звездообразные структуры с центральным управляющим узлом</li>
        <li>Полные градиенты с максимальной связностью</li>
        <li>Решетчатые структуры (2D/3D) для задач численного моделирования</li>
      </ul>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <thead>
          <tr style="background-color: #f8f9fa;">
            <th style="border: 1px solid #ddd; padding: 12px;">Тип кластера</th>
            <th style="border: 1px solid #ddd; padding: 12px;">Время отклика</th>
            <th style="border: 1px solid #ddd; padding: 12px;">Надежность</th>
            <th style="border: 1px solid #ddd; padding: 12px;">Типичные применения</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">HA (High Availability)</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Критично</td>
            <td style="border: 1px solid #ddd; padding: 12px;">99.999% и выше</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Финансовые системы, телеком</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">HPC (High Performance Computing)</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Высокая пропускная способность</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Средняя</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Научные вычисления, моделирование</td>
          </tr>
          <tr>
            <td style="border: 1px solid #ddd; padding: 12px;">Load Balancing</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Среднее</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Высокая</td>
            <td style="border: 1px solid #ddd; padding: 12px;">Веб-сервисы, облачные платформы</td>
          </tr>
        </tbody>
      </table>
      
      <p>Выбор конкретной топологии представляет собой компромисс между стоимостью реализации, сложностью маршрутизации и соответствием структуре решаемой задачи.</p>
    `
  }
};