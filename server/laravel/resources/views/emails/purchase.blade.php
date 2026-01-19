<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
</head>
<body>
    <h2>{{ $user->name }}様</h2>
    <p>ご購入ありがとうございました。以下の商品を購入しました：</p>

    <ul>
    @foreach ($items as $item)
        <li>{{ $item['name'] }} × {{ $item['quantity'] }}</li>
    @endforeach
    </ul>
</body>
</html>
