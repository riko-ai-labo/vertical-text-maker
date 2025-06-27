document.addEventListener('DOMContentLoaded', function() {
    const textInput = document.getElementById('textInput');
    const convertButton = document.getElementById('convertButton');
    const outputArea = document.getElementById('outputArea');
    const copyButton = document.getElementById('copyButton');

    function convertToVertical() {
        const inputText = textInput.value;
        
        outputArea.innerHTML = '';
        copyButton.style.display = 'none';
        
        if (inputText.trim() === '') {
            return;
        }
        
        if (inputText.replace(/[\s　]/g, '').length === 0) {
            alert('文字を入力してください（空白のみは変換できません）');
            return;
        }
        
        if (inputText.length > 50) {
            alert('50文字以内で入力してください');
            return;
        }
        
        const characters = Array.from(inputText);
        
        characters.forEach(char => {
            // 伸ばし棒を縦棒に変換
            let displayChar = char;
            if (char === 'ー' || char === '－' || char === '―' || char === '—' || char === '-' || char === '–') {
                displayChar = '｜';
            } else if (char === '〜' || char === '～') {
                displayChar = '｜';
            }
            
            const charElement = document.createElement('div');
            charElement.className = 'vertical-char';
            charElement.textContent = displayChar;
            outputArea.appendChild(charElement);
        });
        
        copyButton.style.display = 'inline-block';
    }

    convertButton.addEventListener('click', convertToVertical);
    
    textInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            convertToVertical();
        }
    });
    
    textInput.addEventListener('input', function() {
        if (textInput.value === '') {
            outputArea.innerHTML = '';
            copyButton.style.display = 'none';
        }
    });
    
    copyButton.addEventListener('click', function() {
        const verticalText = Array.from(outputArea.querySelectorAll('.vertical-char'))
            .map(el => el.textContent)
            .join('\n');
        
        navigator.clipboard.writeText(verticalText).then(function() {
            const originalText = copyButton.textContent;
            copyButton.textContent = 'コピーしました！';
            setTimeout(function() {
                copyButton.textContent = originalText;
            }, 2000);
        }).catch(function(err) {
            alert('コピーに失敗しました');
        });
    });
});